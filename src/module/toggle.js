function register_themeToggle() {
    const toggle = document.getElementById("theme-toggle");

    toggle.addEventListener("click", function () {
        let storedMode = localStorage.getItem("theme-mode");

        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (localStorage.getItem("theme-mode") === "system") {
                applyTheme("system");
            }
        });
        const nextMode = storedMode === "dark" ? "light" : "dark";
        applyTheme(nextMode);
        localStorage.setItem("theme-mode", nextMode);
    });
}

function register_pixelToggle() {
    const pixel_toggle = document.getElementById('pixel-toggle');

    pixel_toggle.addEventListener('click', function () {
        let storedStatus = localStorage.getItem("pixel_style");
        let newStatus = storedStatus === 'true' ? 'false' : 'true';
        document.documentElement.setAttribute("pixel_style", newStatus);
        localStorage.setItem("pixel_style", newStatus);
    });
}

terminal.registerInitFunc(register_pixelToggle);
terminal.registerInitFunc(register_themeToggle);