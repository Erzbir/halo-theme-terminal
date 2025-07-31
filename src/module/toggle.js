function register_themeToggle() {
    const toggle = document.getElementById("theme-toggle");
    let storedMode = localStorage.getItem("theme-mode");

    function getSystemScheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function applyTheme(mode) {
        const actualMode = mode === 'system' ? getSystemScheme() : mode;
        const targetTheme = actualMode === "light" ? light_theme : dark_theme;

        document.documentElement.setAttribute("data-color-scheme", actualMode);
        document.documentElement.setAttribute("theme-color-scheme", targetTheme);
    }

    if (!storedMode) {
        localStorage.setItem("theme-mode", default_mode);
        storedMode = default_mode;
    }

    applyTheme(storedMode);

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (localStorage.getItem("theme-mode") === "system") {
            applyTheme("system");
        }
    });

    toggle.addEventListener("click", function () {
        const nextMode = storedMode === "dark" ? "light" : "dark";

        applyTheme(nextMode);
        localStorage.setItem("theme-mode", nextMode);
        storedMode = nextMode;
    });
}

function register_pixelToggle() {
    const pixel_toggle = document.getElementById('pixel-toggle');
    let storedStatus = localStorage.getItem("pixel_style");
    if (!storedStatus) {
        localStorage.setItem("pixel_style", pixel_status);
        storedStatus = pixel_status.toString();
    }

    document.documentElement.setAttribute("pixel_style", storedStatus);

    pixel_toggle.addEventListener('click', function () {
        let newStatus = storedStatus === 'true' ? 'false' : 'true';
        document.documentElement.setAttribute("pixel_style", newStatus);
        localStorage.setItem("pixel_style", newStatus);

        storedStatus = newStatus;
    });
}

terminal.registerInitFunc(register_pixelToggle);
terminal.registerInitFunc(register_themeToggle);