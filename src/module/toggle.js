function register_themeToggle() {
    const toggle = document.getElementById("theme-toggle");
    let storedMode = localStorage.getItem("theme-mode");

    if (!storedMode) {
        localStorage.setItem("theme-mode", default_mode);
        storedMode = default_mode;
    }

    const targetTheme = storedMode === "light" ? light_theme : dark_theme;

    document.documentElement.setAttribute("data-color-scheme", storedMode);
    document.documentElement.setAttribute("theme-color-scheme", targetTheme);

    toggle.addEventListener("click", function () {
        const nextMode = storedMode === "dark" ? "light" : "dark";
        const nextTheme = nextMode === "dark" ? dark_theme : light_theme;

        document.documentElement.setAttribute("data-color-scheme", nextMode);
        document.documentElement.setAttribute("theme-color-scheme", nextTheme);
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