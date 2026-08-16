export const PREFERENCE_KEYS = Object.freeze({
    themeMode: "theme-mode",
    colorScheme: "theme-color-scheme",
    pixelStyle: "pixel-style"
});

export function getStoredPreference(key) {
    return window.TerminalTheme?.storage
        ? window.TerminalTheme.storage.get(key)
        : localStorage.getItem(key);
}

export function setStoredPreference(key, value) {
    if (window.TerminalTheme?.storage) {
        window.TerminalTheme.storage.set(key, value);
        return;
    }

    localStorage.setItem(key, value);
}
