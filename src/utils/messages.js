export function getMessage(key, fallback) {
    return window.TerminalThemeConfig?.messages?.[key] || fallback;
}
