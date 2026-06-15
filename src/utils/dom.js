export function debounce(callback, wait = 250) {
    let timeoutId;

    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => callback(...args), wait);
    };
}

export function toggleClass(element, className, enabled) {
    if (!element) return;
    element.classList.toggle(className, enabled);
}
