import tocbot from "tocbot";

async function generateToc() {
    const toc = document.querySelector(".toc");
    if (!toc) return;
    const content = document.getElementById("content");
    const titles = content.querySelectorAll("h1, h2, h3, h4");
    if (!titles || titles.length === 0) {
        toc.style.display = "none";
        toc.remove();
        return;
    } else {
        toc.style.display = "block";
    }
    if (typeof tocbot !== 'undefined') {
        tocbot.destroy();
        tocbot.init({
            tocSelector: ".toc",
            contentSelector: "#content",
            headingSelector: "h1, h2, h3, h4",
            extraListClasses: "toc-list",
            extraLinkClasses: "toc-link",
            headingsOffset: 96,
            scrollSmoothOffset: -96,
            scrollSmooth: true,
        });
    }
    void locateToc();
}

async function locateToc() {
    const toc = document.querySelector(".toc")
    if (!toc) return;
    const content = document.getElementById("content");
    const contentRight = content.getBoundingClientRect().right;
    if (toc && contentRight) {
        toc.style.left = `${contentRight}px`;
    }
}

function destroyToc() {
    const toc = document.querySelector(".toc")
    if (!toc) return;
    toc.style.display = "none";
    toc.remove();
    if (typeof tocbot !== 'undefined') {
        tocbot.destroy();
    }
}

async function init_toc() {
    void generateToc();
    void locateToc();

    let resizeTimer;
    let isVisible = true;

    document.addEventListener('visibilitychange', () => {
        isVisible = !document.hidden;
    });

    window.addEventListener('resize', () => {
        if (!isVisible) return;

        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            requestAnimationFrame(() => {
                locateToc();
            });
        }, 200);
    });
}

function register_toc() {
    document.addEventListener('DOMContentLoaded', () => {
        void init_toc();
    });
}


terminal.registerRefresh(generateToc);
terminal.registerInitFunc(register_toc);
