import {terminal} from "../terminal.js";
import {debounce, toggleClass} from "../utils/dom.js";
import tocbot from "tocbot";

const TOC_SELECTOR = "#toc";
const TOC_CONTENT_SELECTOR = ".toc-content";
const CONTENT_SELECTOR = "#content";
const HEADING_SELECTOR = "h1, h2, h3, h4";
const TOC_VISIBLE_CLASS = "toc-visible";
const TOC_TOGGLE_ID = "toc-toggle";
const TOC_OPEN_ICON = "☰";
const TOC_CLOSE_ICON = "✕";
const DESKTOP_TOC_WIDTH = 1400;
const TOC_GAP = 12;
const FALLBACK_TOC_WIDTH_REM = 17.5;
const RESIZE_DEBOUNCE_MS = 250;

let resizeListenerRegistered = false;

function isTocDefaultOpen(toc) {
    return toc?.dataset?.defaultOpen !== "false";
}

function getToc() {
    return document.querySelector(TOC_SELECTOR);
}

function getTocToggle() {
    return document.getElementById(TOC_TOGGLE_ID);
}

function getContent() {
    return document.querySelector(CONTENT_SELECTOR);
}

function destroyTocbot() {
    if (typeof tocbot !== "undefined") {
        tocbot.destroy();
    }
}

function syncToggleButton(toc = getToc()) {
    const tocToggle = getTocToggle();
    if (!toc || !tocToggle) return;

    const isVisible = toc.classList.contains(TOC_VISIBLE_CLASS);
    tocToggle.textContent = isVisible ? TOC_CLOSE_ICON : TOC_OPEN_ICON;
    tocToggle.setAttribute("aria-label", isVisible ? "Hide Table of Contents" : "Show Table of Contents");

    if (tocToggle.dataset.tocBound === "true") return;
    tocToggle.addEventListener("click", toggleToc);
    tocToggle.dataset.tocBound = "true";
}

function setTocVisible(toc, visible) {
    toggleClass(toc, TOC_VISIBLE_CLASS, visible);
    syncToggleButton(toc);
}

function toggleToc() {
    const toc = getToc();
    if (!toc) return;

    const isVisible = toc.classList.contains(TOC_VISIBLE_CLASS);
    setTocVisible(toc, !isVisible);
    locateToc();
}

function hideToc(toc) {
    toc.style.display = "none";
    toc.remove();
    destroyTocbot();
}

function initTocbot() {
    destroyTocbot();
    tocbot.init({
        tocSelector: TOC_CONTENT_SELECTOR,
        contentSelector: CONTENT_SELECTOR,
        headingSelector: HEADING_SELECTOR,
        extraListClasses: "toc-list",
        extraLinkClasses: "toc-link",
        headingsOffset: 96,
        scrollSmoothOffset: -96,
        scrollSmooth: true,
    });
}

function shouldShowExpandedToc(toc) {
    return isTocDefaultOpen(toc) && window.innerWidth > DESKTOP_TOC_WIDTH;
}

function setupTocVisibility(toc = getToc()) {
    if (!toc) return;

    toc.style.display = "block";
    setTocVisible(toc, shouldShowExpandedToc(toc));
}

function generateToc() {
    const toc = getToc();
    const content = getContent();

    if (!toc || !content) {
        destroyTocbot();
        return;
    }

    const titles = content.querySelectorAll(HEADING_SELECTOR);
    if (!titles || titles.length === 0) {
        hideToc(toc);
        return;
    }

    initTocbot();
    setupTocVisibility(toc);
    syncToggleButton(toc);
    locateToc();
}

function getTocExpandedWidth(toc) {
    return toc.offsetWidth > 0
        ? toc.offsetWidth
        : Number.parseFloat(getComputedStyle(document.documentElement).fontSize) * FALLBACK_TOC_WIDTH_REM;
}

function hasEnoughSpace(content, toc) {
    const contentRect = content.getBoundingClientRect();
    const tocExpandedWidth = getTocExpandedWidth(toc);

    const spaceRight = window.innerWidth - contentRect.right - TOC_GAP;
    return spaceRight >= tocExpandedWidth;
}

function locateToc() {
    const toc = getToc();
    if (!toc) return;

    const content = getContent();
    if (!content) return;

    const contentRect = content.getBoundingClientRect();

    if (hasEnoughSpace(content, toc)) {
        toc.style.left = `${contentRect.right + TOC_GAP}px`;
        toc.style.right = "auto";
    } else {
        toc.style.left = "auto";
        toc.style.right = `${TOC_GAP}px`;
        toc.style.top = "auto";
    }

}

function handleResize() {
    const toc = getToc();
    if (!toc) return;

    setupTocVisibility(toc);
    syncToggleButton(toc);
    locateToc();
}

function initToc() {
    if (resizeListenerRegistered) return;
    window.addEventListener("resize", debounce(handleResize, RESIZE_DEBOUNCE_MS));
    resizeListenerRegistered = true;
}


terminal.registerRefresh(generateToc);
terminal.registerInitFunc(initToc);
