import tocbot from "tocbot";

let toc_icon = "☰"
let toc_close_icon = "✕"

function toggleToc() {
    const toc = document.getElementById("toc");
    if (!toc) return;
    const toc_toggle = document.getElementById("toc-toggle");

    if (!toc_toggle) return;

    const isVisible = toc.classList.contains('toc-visible');

    if (isVisible) {
        toc.classList.remove('toc-visible');
        toc.classList.remove('toc-overflow-right');
        toc_toggle.innerHTML = toc_icon;
        toc_toggle.setAttribute('aria-label', 'Show Table of Contents');

    } else {
        toc.classList.add('toc-visible');
        toc_toggle.innerHTML = toc_close_icon;
        toc_toggle.setAttribute('aria-label', 'Hide Table of Contents');
    }
    void locateToc();
}

async function generateToc() {
    const toc = document.getElementById("toc");
    if (!toc) return;

    const content = document.getElementById("content");
    const titles = content.querySelectorAll("h1, h2, h3, h4");

    if (!titles || titles.length === 0) {
        toc.style.display = "none";
        toc.remove();
        return;
    }

    if (typeof tocbot !== 'undefined') {
        tocbot.destroy();
        tocbot.init({
            tocSelector: ".toc-content",
            contentSelector: "#content",
            headingSelector: "h1, h2, h3, h4",
            extraListClasses: "toc-list",
            extraLinkClasses: "toc-link",
            headingsOffset: 96,
            scrollSmoothOffset: -96,
            scrollSmooth: true,
        });
    }

    setupTocVisibility();
    setupToggleButton();
    void locateToc();
}

function setupTocVisibility() {
    const toc = document.querySelector(".toc");
    if (!toc) return;

    toc.style.display = "block";

    if (window.innerWidth <= 1400) {
        toc.classList.remove('toc-visible');
    } else {
        toc.classList.add('toc-visible');
    }
}

function setupToggleButton() {
    const toc = document.getElementById("toc");
    const toc_toggle = document.getElementById("toc-toggle");

    const isVisible = toc.classList.contains('toc-visible');
    toc_toggle.innerHTML = isVisible ? toc_close_icon : toc_icon;
    toc_toggle.setAttribute('aria-label', isVisible ? 'Hide Table of Contents' : 'Show Table of Contents');

    toc_toggle.addEventListener('click', toggleToc);
}

async function locateToc() {
    const toc = document.getElementById("toc");
    if (!toc) return;
    const toc_toggle = document.getElementById("toc-toggle");

    const content = document.getElementById("content");
    const contentRect = content.getBoundingClientRect();
    const contentRight = contentRect.right;

    if (contentRight) {
        let leftPosition = contentRight + 12;

        const screenWidth = window.innerWidth;
        const buttonWidth = toc_toggle.offsetWidth;
        const tocWidth = toc.classList.contains('toc-visible') ? toc.offsetWidth : buttonWidth;

        const maxLeft = screenWidth - tocWidth - 30;
        leftPosition = Math.min(leftPosition, maxLeft);
        leftPosition = Math.max(leftPosition, 30);


        toc.style.left = `${leftPosition}px`;

        if (toc.classList.contains('toc-visible')) {
            const rightEdge = leftPosition + tocWidth;

            if (rightEdge > window.innerWidth) {
                toc.classList.add('toc-overflow-right');
            } else {
                toc.classList.remove('toc-overflow-right');
            }
        }
    }
}

function handleResize() {
    const toc = document.getElementById("toc");
    if (!toc) return;

    setupTocVisibility();
    setupToggleButton();
    void locateToc();
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function destroyToc() {
    const toc = document.getElementById("toc")
    if (!toc) return;
    toc.style.display = "none";
    toc.remove();
    if (typeof tocbot !== 'undefined') {
        tocbot.destroy();
    }
}

async function init_toc() {
    void generateToc();
    window.addEventListener('resize', debounce(handleResize, 250));

}

function register_toc() {
    document.addEventListener('DOMContentLoaded', () => {
        void init_toc();
    });
}


terminal.registerRefresh(generateToc);
terminal.registerInitFunc(register_toc);
