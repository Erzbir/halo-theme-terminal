import {syncColorSchemePicker} from "./color-scheme-picker.js";
import {getStoredPreference, PREFERENCE_KEYS, setStoredPreference} from "../utils/theme-preferences.js";
import {getMessage} from "../utils/messages.js";

const APPEARANCE_MODES = ["light", "dark", "system"];

function getAppearanceMode() {
    const mode = document.documentElement.dataset.themeMode
        || getStoredPreference(PREFERENCE_KEYS.themeMode)
        || window.TerminalThemeConfig?.defaultMode;

    return APPEARANCE_MODES.includes(mode) ? mode : "system";
}

function syncAppearanceToggle(toggle) {
    const mode = getAppearanceMode();
    const fallbackLabels = {
        light: "Light",
        dark: "Dark",
        system: "System"
    };
    const currentLabel = getMessage("currentAppearance", "Current appearance");
    const modeLabel = getMessage(
        `appearance${mode[0].toUpperCase()}${mode.slice(1)}`,
        fallbackLabels[mode]
    );
    const description = `${currentLabel}: ${modeLabel}`;

    toggle.setAttribute("aria-label", description);
    toggle.title = description;
}

function registerSearchButton() {
    const searchButton = document.querySelector('[data-header-action="open-search"]');
    if (!searchButton) return;

    searchButton.addEventListener("click", function () {
        if (typeof window.SearchWidget?.open === "function") {
            window.SearchWidget.open();
        }
    });
}

function registerAppearanceToggle() {
    const toggle = document.getElementById("appearance-toggle");
    if (!toggle || typeof window.applyTheme !== "function") return;

    syncAppearanceToggle(toggle);

    toggle.addEventListener("click", function () {
        const currentMode = getAppearanceMode();
        const nextMode = APPEARANCE_MODES[
            (APPEARANCE_MODES.indexOf(currentMode) + 1) % APPEARANCE_MODES.length
        ];

        window.applyTheme(nextMode, {clearColorScheme: true});
        setStoredPreference(PREFERENCE_KEYS.themeMode, nextMode);
        syncAppearanceToggle(toggle);
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
    registerAppearanceToggle();
    registerPixelToggle();
}
