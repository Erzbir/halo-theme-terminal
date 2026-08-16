import {syncColorSchemePicker} from "./color-scheme-picker.js";
import {getStoredPreference, PREFERENCE_KEYS, setStoredPreference} from "../utils/theme-preferences.js";

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
        const currentScheme = document.documentElement.dataset.colorScheme;
        const nextMode = currentScheme === "dark" ? "light" : "dark";

        window.applyTheme(nextMode, {clearColorScheme: true});
        setStoredPreference(PREFERENCE_KEYS.themeMode, nextMode);
        syncColorSchemePicker();
    });
}

function registerPixelToggle() {
    const pixelToggle = document.getElementById("pixel-toggle");
    if (!pixelToggle) return;

    pixelToggle.addEventListener("click", function () {
        const storedStatus = getStoredPreference(PREFERENCE_KEYS.pixelStyle);
        const currentStatus = storedStatus
            || document.documentElement.dataset.pixelStyle;
        const newStatus = currentStatus === "true" ? "false" : "true";

        document.documentElement.dataset.pixelStyle = newStatus;
        setStoredPreference(PREFERENCE_KEYS.pixelStyle, newStatus);
        window.TerminalTheme?.syncPixelFont?.();
    });
}

export function registerHeaderActions() {
    registerSearchButton();
    registerThemeToggle();
    registerPixelToggle();
}
