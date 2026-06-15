import {terminal} from "../terminal.js";

const THEME_MODE_STORAGE_KEY = "theme-mode";
const PIXEL_STYLE_STORAGE_KEY = "pixel_style";

function registerSearchButton() {
    const searchButton = document.querySelector('[data-header-action="open-search"]');
    if (!searchButton) return;

    searchButton.addEventListener("click", function () {
        if (typeof window.SearchWidget?.open === "function") {
            window.SearchWidget.open();
        }
    });
}

function registerThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle || typeof window.applyTheme !== "function") return;

    toggle.addEventListener("click", function () {
        const currentScheme = document.documentElement.getAttribute("data-color-scheme");
        const nextMode = currentScheme === "dark" ? "light" : "dark";

        window.applyTheme(nextMode);

        const isSystemMode = currentScheme === "system";
        if (!isSystemMode) {
            localStorage.setItem(THEME_MODE_STORAGE_KEY, nextMode);
        }
    });
}

function registerPixelToggle() {
    const pixelToggle = document.getElementById("pixel-toggle");
    if (!pixelToggle) return;

    pixelToggle.addEventListener("click", function () {
        const storedStatus = localStorage.getItem(PIXEL_STYLE_STORAGE_KEY);
        const newStatus = storedStatus === "true" ? "false" : "true";
        document.documentElement.setAttribute(PIXEL_STYLE_STORAGE_KEY, newStatus);
        localStorage.setItem(PIXEL_STYLE_STORAGE_KEY, newStatus);
        window.TerminalTheme?.syncPixelFont?.();
    });
}

terminal.registerInitFunc(registerSearchButton);
terminal.registerInitFunc(registerPixelToggle);
terminal.registerInitFunc(registerThemeToggle);
