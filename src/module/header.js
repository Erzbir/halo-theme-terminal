import {terminal} from "../terminal.js";

const THEME_MODE_STORAGE_KEY = "theme-mode";
const COLOR_SCHEME_STORAGE_KEY = "theme-color-scheme";
const PIXEL_STYLE_STORAGE_KEY = "pixel_style";
const COLOR_SCHEME_SELECTOR_PATTERN = /html\[theme-color-scheme\s*=\s*(['"]?)([^'"\]\s]+)\1\]/g;

function getStoredPreference(key) {
    return window.TerminalTheme?.storage
        ? window.TerminalTheme.storage.get(key)
        : localStorage.getItem(key);
}

function setStoredPreference(key, value) {
    if (window.TerminalTheme?.storage) {
        window.TerminalTheme.storage.set(key, value);
        return;
    }
    localStorage.setItem(key, value);
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

function registerThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    if (!toggle || typeof window.applyTheme !== "function") return;

    toggle.addEventListener("click", function () {
        const currentScheme = document.documentElement.getAttribute("data-color-scheme");
        const nextMode = currentScheme === "dark" ? "light" : "dark";

        window.applyTheme(nextMode, {clearColorScheme: true});
        setStoredPreference(THEME_MODE_STORAGE_KEY, nextMode);
        syncColorSchemePicker();
    });
}

function collectColorSchemes(cssRules, schemes) {
    for (const rule of cssRules) {
        if (rule.selectorText) {
            for (const match of rule.selectorText.matchAll(COLOR_SCHEME_SELECTOR_PATTERN)) {
                schemes.add(match[2]);
            }
        }

        if (rule.cssRules) {
            collectColorSchemes(rule.cssRules, schemes);
        }
    }
}

function getDefinedColorSchemes() {
    const schemes = new Set();

    for (const styleSheet of document.styleSheets) {
        try {
            collectColorSchemes(styleSheet.cssRules, schemes);
        } catch {
            // Cross-origin stylesheets do not expose their CSS rules.
        }
    }

    return schemes;
}

function createColorSchemeOption(scheme) {
    const option = document.createElement("button");
    option.className = "color-scheme-option";
    option.type = "button";
    option.role = "option";
    option.tabIndex = -1;
    option.dataset.colorScheme = scheme;
    option.setAttribute("aria-selected", "false");
    option.textContent = scheme;
    return option;
}

function populateColorSchemeMenu(menu) {
    menu.replaceChildren(createColorSchemeOption("default"));

    for (const scheme of getDefinedColorSchemes()) {
        menu.appendChild(createColorSchemeOption(scheme));
    }
}

function syncColorSchemePicker() {
    const picker = document.getElementById("color-scheme-picker");
    if (!picker) return;

    const storedScheme = getStoredPreference(COLOR_SCHEME_STORAGE_KEY);
    const options = Array.from(picker.querySelectorAll("[data-color-scheme]"));
    const hasStoredOption = storedScheme && options
        .some(option => option.dataset.colorScheme === storedScheme);

    if (storedScheme && !hasStoredOption) {
        const storedMode = getStoredPreference(THEME_MODE_STORAGE_KEY)
            || window.TerminalThemeConfig?.defaultMode
            || "system";

        window.applyTheme?.(storedMode, {clearColorScheme: true});
    }

    const selectedScheme = hasStoredOption ? storedScheme : "default";
    const trigger = picker.querySelector("#color-scheme-trigger");
    if (trigger) {
        const description = `选择配色，当前：${selectedScheme}`;
        trigger.setAttribute("aria-label", description);
        trigger.title = description;
    }

    for (const option of options) {
        option.setAttribute(
            "aria-selected",
            String(option.dataset.colorScheme === selectedScheme)
        );
    }
}

function setColorSchemeMenuOpen(picker, open) {
    const trigger = picker.querySelector("#color-scheme-trigger");
    const menu = picker.querySelector("#color-scheme-menu");
    if (!trigger || !menu) return;

    trigger.setAttribute("aria-expanded", String(open));
    menu.hidden = !open;
}

function focusColorSchemeOption(picker, direction) {
    const options = Array.from(picker.querySelectorAll("[data-color-scheme]"));
    if (!options.length) return;

    const selectedIndex = options.findIndex(
        option => option.getAttribute("aria-selected") === "true"
    );
    const fallbackIndex = direction === "last" ? options.length - 1 : 0;
    options[selectedIndex >= 0 ? selectedIndex : fallbackIndex].focus();
}

function registerColorSchemePicker() {
    const picker = document.getElementById("color-scheme-picker");
    const trigger = picker?.querySelector("#color-scheme-trigger");
    const menu = picker?.querySelector("#color-scheme-menu");
    if (!picker || !trigger || !menu
        || typeof window.TerminalTheme?.applyColorScheme !== "function") return;

    populateColorSchemeMenu(menu);
    syncColorSchemePicker();

    trigger.addEventListener("click", function () {
        const open = trigger.getAttribute("aria-expanded") !== "true";
        setColorSchemeMenuOpen(picker, open);
        if (open) focusColorSchemeOption(picker, "first");
    });

    trigger.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
        event.preventDefault();
        setColorSchemeMenuOpen(picker, true);
        focusColorSchemeOption(picker, event.key === "ArrowUp" ? "last" : "first");
    });

    menu.addEventListener("click", function (event) {
        const option = event.target.closest("[data-color-scheme]");
        if (!option || !menu.contains(option)) return;

        window.TerminalTheme.applyColorScheme(option.dataset.colorScheme);
        syncColorSchemePicker();
        setColorSchemeMenuOpen(picker, false);
        trigger.focus();
    });

    menu.addEventListener("keydown", function (event) {
        const options = Array.from(menu.querySelectorAll("[data-color-scheme]"));
        const currentIndex = options.indexOf(document.activeElement);

        if (event.key === "Escape") {
            event.preventDefault();
            setColorSchemeMenuOpen(picker, false);
            trigger.focus();
            return;
        }

        if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
        event.preventDefault();

        let nextIndex = currentIndex;
        if (event.key === "Home") nextIndex = 0;
        if (event.key === "End") nextIndex = options.length - 1;
        if (event.key === "ArrowDown") nextIndex = (currentIndex + 1) % options.length;
        if (event.key === "ArrowUp") {
            nextIndex = (currentIndex - 1 + options.length) % options.length;
        }
        options[nextIndex].focus();
    });

    picker.addEventListener("focusout", function (event) {
        if (!picker.contains(event.relatedTarget)) {
            setColorSchemeMenuOpen(picker, false);
        }
    });

    document.addEventListener("click", function (event) {
        if (!picker.contains(event.target)) {
            setColorSchemeMenuOpen(picker, false);
        }
    });
}

function registerPixelToggle() {
    const pixelToggle = document.getElementById("pixel-toggle");
    if (!pixelToggle) return;

    pixelToggle.addEventListener("click", function () {
        const storedStatus = getStoredPreference(PIXEL_STYLE_STORAGE_KEY);
        const currentStatus = storedStatus
            || document.documentElement.getAttribute(PIXEL_STYLE_STORAGE_KEY);
        const newStatus = currentStatus === "true" ? "false" : "true";
        document.documentElement.setAttribute(PIXEL_STYLE_STORAGE_KEY, newStatus);
        setStoredPreference(PIXEL_STYLE_STORAGE_KEY, newStatus);
        window.TerminalTheme?.syncPixelFont?.();
    });
}

terminal.registerInitFunc(registerSearchButton);
terminal.registerInitFunc(registerColorSchemePicker);
terminal.registerInitFunc(registerPixelToggle);
terminal.registerInitFunc(registerThemeToggle);
