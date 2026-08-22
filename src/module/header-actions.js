import {syncColorSchemePicker} from "./color-scheme-picker.js";
import {getStoredPreference, PREFERENCE_KEYS, setStoredPreference} from "../utils/theme-preferences.js";
import {getMessage} from "../utils/messages.js";

const APPEARANCE_MODES = ["light", "dark", "system"];

function getAppearanceMode() {
    const mode = document.documentElement.dataset.themeMode
        || getStoredPreference(PREFERENCE_KEYS.themeMode)
        || window.TerminalThemeConfig?.defaultAppearance;

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
    document.querySelectorAll('[data-header-action="open-search"]').forEach(searchButton => {
        searchButton.addEventListener("click", function () {
            if (typeof window.SearchWidget?.open === "function") {
                window.SearchWidget.open();
            }
        });
    });
}

function registerAppearanceToggle() {
    if (typeof window.applyTheme !== "function") return;

    document.querySelectorAll(".appearance-toggle").forEach(toggle => {
        syncAppearanceToggle(toggle);

        toggle.addEventListener("click", function () {
            const currentMode = getAppearanceMode();
            const nextMode = APPEARANCE_MODES[
                (APPEARANCE_MODES.indexOf(currentMode) + 1) % APPEARANCE_MODES.length
            ];

            window.applyTheme(nextMode, {clearColorScheme: true});
            setStoredPreference(PREFERENCE_KEYS.themeMode, nextMode);
            document.querySelectorAll(".appearance-toggle").forEach(syncAppearanceToggle);
            syncColorSchemePicker();
        });
    });
}

function registerPixelToggle() {
    document.querySelectorAll(".pixel-toggle").forEach(pixelToggle => {
        pixelToggle.addEventListener("click", function () {
            const storedStatus = getStoredPreference(PREFERENCE_KEYS.pixelStyle);
            const currentStatus = storedStatus
                || document.documentElement.dataset.pixelStyle;
            const newStatus = currentStatus === "true" ? "false" : "true";

            document.documentElement.dataset.pixelStyle = newStatus;
            setStoredPreference(PREFERENCE_KEYS.pixelStyle, newStatus);
            window.TerminalTheme?.syncPixelFont?.();
        });
    });
}

function registerCustomButtons() {
    document.querySelectorAll('[data-header-action="custom"]').forEach(button => {
        const source = button.dataset.onclick?.trim();
        if (!source || button.dataset.customActionReady === "true") return;

        let handler;
        try {
            handler = new Function("event", source);
        } catch (error) {
            console.error("Invalid custom header button onclick:", error);
            return;
        }

        button.dataset.customActionReady = "true";
        button.addEventListener("click", function (event) {
            try {
                const result = handler.call(this, event);
                if (result === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
            } catch (error) {
                console.error("Custom header button onclick failed:", error);
            }
        });
    });
}

export function registerHeaderActions() {
    registerSearchButton();
    registerAppearanceToggle();
    registerPixelToggle();
    registerCustomButtons();
}
