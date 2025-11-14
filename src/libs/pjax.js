// Original source code from: https://github.com/LIlGG/halo-theme-sakura/blob/main/src/libs/pjax.js

import Pjax from "pjax";

const pjax = new Pjax({
    elements: "a[data-pjax]",
    selectors: ["head title", ".content", ".ex-pjax"],
    switches: {
        ".content": Pjax.switches.innerHTML,
    },
    cacheBust: false,
    analytics: false,
    debug: false
});

let _responseText = '';

pjax._handleResponse = pjax.handleResponse;

pjax.handleResponse = function (responseText, request, href, options) {
    _responseText = responseText;
    pjax._handleResponse(responseText, request, href, options);
};

function djb2(str) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) + hash) + str.charCodeAt(i);
    }
    return (hash >>> 0)
}

function renewElement(element) {
    const newElem = document.createElement(element.tagName);
    for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i];
        newElem.setAttribute(attr.name, attr.value);
    }
    return newElem;
}

function insertStyleLink(dom, parentElement, selectors) {
    const existingStyles = new Set();

    document.querySelectorAll(selectors).forEach(link => {
        existingStyles.add(link.href);
    });

    dom.querySelectorAll(selectors).forEach(link => {
        const href = link.href;
        if (href && !existingStyles.has(href)) {
            const newLink = renewElement(link);
            parentElement.appendChild(newLink);
        }
    });
}

function insertStyle(dom, parentElement, selectors) {
    dom.querySelectorAll(selectors).forEach(style => {
        if (style.innerHTML.trim()) {
            let hash = djb2(style.innerHTML);
            let old = parentElement.querySelector(`style[data-hash="${hash}"]`);
            if (old) {
                parentElement.removeChild(old);
            } else {
                let styles = parentElement.querySelectorAll('style:not([no-pjax])');
                styles.forEach((s) => {
                    if (s) {
                        if (djb2(s.innerHTML) === hash) {
                            parentElement.removeChild(s);
                        }
                    }
                });
            }
            style.setAttribute("data-hash", hash);
            parentElement.appendChild(style);
        }
    });
    const existingStyles = new Set();

    document.querySelectorAll(selectors).forEach(style => {
        let hash = djb2(style.innerHTML);
        existingStyles.add(style);
    });

    dom.querySelectorAll(selectors).forEach(style => {
        if (style && !existingStyles.has(style)) {
            parentElement.appendChild(style);
        }
    });
}

function insertScript(dom, parentElement, selectors) {
    const existingScripts = new Set();

    parentElement.querySelectorAll(selectors).forEach(script => {
        existingScripts.add(script.src);
    });

    dom.querySelectorAll(selectors).forEach(script => {
        const src = script.src;
        if (src && !existingScripts.has(src)) {
            const newScript = renewElement(script);
            parentElement.appendChild(newScript);
        }
    });
}

function insertInlineScript(dom, parentElement, selectors) {
    dom.querySelectorAll(selectors).forEach(script => {
        if (script.innerHTML.trim()) {
            let hash = djb2(script.innerHTML);
            let old = parentElement.querySelector(`script[data-hash="${hash}"]`);
            if (old) {
                parentElement.removeChild(old);
            } else {
                let scripts = parentElement.querySelectorAll('script:not([src]):not([no-pjax])');
                scripts.forEach((s) => {
                    if (s) {
                        if (djb2(s.innerHTML) === hash) {
                            parentElement.removeChild(s);
                        }
                    }
                });
            }
            const newScript = renewElement(script);
            newScript.innerHTML = script.innerHTML;
            newScript.setAttribute("data-hash", hash);
            parentElement.appendChild(newScript);
        }
    });

}

// 这个函数将请求的页面 head 中 script 和 link 都插入进来合成新页面
function insertResourcesToHead(dom, parentElement) {
    insertStyleLink(dom, parentElement, 'head link[rel="stylesheet"]:not([no-pjax])');
    insertStyle(dom, parentElement, 'head style:not([no-pjax])');
    insertScript(dom, parentElement, 'head script[src]:not([no-pjax])');
    insertInlineScript(dom, parentElement, 'head script:not([src]):not([no-pjax])');
}

// 这个函数将请求的页面 footer 中 script 和 link 都插入进来合成新页面
function insertResourcesToFooter(dom, parentElement) {
    insertStyleLink(dom, parentElement, 'footer link[rel="stylesheet"][data-pjax]:not([no-pjax])');
    insertScript(dom, parentElement, 'footer script[src][data-pjax]:not([no-pjax])');
    insertInlineScript(dom, parentElement, 'footer script:not([src])[data-pjax]:not([no-pjax])');
}

// 处理请求的页面新增样式和脚本
function processNewScripts(responseText) {
    const parser = new DOMParser();
    const dom = parser.parseFromString(responseText, 'text/html');
    insertResourcesToHead(dom, document.head);
    let footer = document.querySelector('footer');
    if (!footer) {
        return;
    }
    insertResourcesToFooter(dom, footer);
}

const originalAddEventListener = EventTarget.prototype.addEventListener;

EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (type === "DOMContentLoaded") {
        if (listener) {
            window.addEventListener(
                "pjax:success",
                () => {
                    retry(() => listener(), 10, 100);
                },
                {
                    once: true,
                }
            );
            return;
        }
    }
    originalAddEventListener.call(this, type, listener, options);
};

// 刷新 script, 以及重新刷新主题注册的函数
document.addEventListener("pjax:complete", function () {
    // 处理头和尾有新增的情况
    processNewScripts(_responseText);
    // 处理替换的内容中存在脚本的情况
    let pjaxDoms = document.querySelectorAll(".content script[data-pjax]:not([no-pjax])");
    pjaxDoms.forEach((element) => {
        let code = element.text || element.textContent || element.innerHTML || "";
        let parent = element.parentNode;
        if (parent === null) {
            return;
        }
        parent.removeChild(element);
        let script = renewElement(element);
        if (code !== "") {
            script.appendChild(document.createTextNode(code));
        }
        parent.appendChild(script);
    });
    // 刷新注册的函数
    window.terminal.refresh();
});

window.addEventListener("pjax:error", (event) => {
    const request = event.request
    if (request.status === 404 || request.status === 500) {
        window.location.href = request.responseURL;
    }
});

pjax.doRequest = function (location, options, callback) {
    options = options || {};
    let queryString;
    const requestOptions = options.requestOptions || {};
    const requestMethod = (requestOptions.requestMethod || "GET").toUpperCase();
    const requestParams = requestOptions.requestParams || null;
    const formData = requestOptions.formData || null;
    let requestPayload = null;
    const request = new XMLHttpRequest();
    const timeout = options.timeout || 0;

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status === 200) {
                callback(request.responseText, request, location, options);
            } else if (request.status !== 0) {
                callback(null, request, location, options);
            }
        }
    };

    request.onerror = function (e) {
        console.log(e);
        callback(null, request, location, options);
    };

    request.ontimeout = function () {
        callback(null, request, location, options);
    };

    if (requestParams && requestParams.length) {
        queryString = requestParams
            .map(function (param) {
                return param.name + "=" + param.value;
            })
            .join("&");

        switch (requestMethod) {
            case "GET":
                location = location.split("?")[0];

                location += "?" + queryString;
                break;

            case "POST":
                requestPayload = queryString;
                break;
        }
    } else if (formData) {
        requestPayload = formData;
    }

    if (options.cacheBust) {
        location = updateQueryString(location, "t", Date.now());
    }

    request.open(requestMethod, location, true);
    request.timeout = timeout;
    request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    request.setRequestHeader("X-PJAX", "true");
    request.setRequestHeader("X-PJAX-Selectors", JSON.stringify(options.selectors));
    request.setRequestHeader("accept", "text/html, application/json, text/plain, */*");
    request.withCredentials = true;

    // 发送 POST 表单
    if (requestPayload && requestMethod === "POST" && !formData) {
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    }

    request.send(requestPayload);

    return request;
};

const updateQueryString = (uri, key, value) => {
    const re = new RegExp(`([?&])${key}=.*?(&|$)`, "i");
    const separator = uri.includes("?") ? "&" : "?";
    return uri.match(re)
        ? uri.replace(re, `$1${key}=${value}$2`)
        : uri + separator + key + "=" + value;
};


async function retry(promiseFn, maxRetries = 3, interval = 1000) {
    try {
        return await promiseFn();
    } catch (error) {
        if (maxRetries > 0) {
            await new Promise((resolve) => setTimeout(resolve, interval));
            return await retry(promiseFn, maxRetries - 1, interval);
        } else {
            throw error;
        }
    }
}