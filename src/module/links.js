import {terminal} from "../terminal.js";

const SECTION_ID = "plugin-links-apply-section";
const FORM_ID = "link-application-form";
const CAPTCHA_URL = "/links/apply/captcha";
const CAPTCHA_EXPIRE_TIME = 5 * 60 * 1000;

let captchaTimer = null;
let listenersRegistered = false;

function clearCaptchaTimer() {
    if (!captchaTimer) return;

    clearTimeout(captchaTimer);
    captchaTimer = null;
}

function refreshCaptcha() {
    const section = document.getElementById(SECTION_ID);
    if (!section) {
        clearCaptchaTimer();
        return;
    }

    const captcha = section.querySelector("#link-application-captcha");
    const overlay = section.querySelector("#captcha-expired-overlay");

    if (!captcha || !overlay) return;

    captcha.src = `${CAPTCHA_URL}?t=${Date.now()}`;
    overlay.style.display = "none";

    clearCaptchaTimer();

    captchaTimer = setTimeout(() => {
        overlay.style.display = "flex";
        captchaTimer = null;
    }, CAPTCHA_EXPIRE_TIME);
}

function showMessage(type, text) {
    const message = document.getElementById("link-application-message");
    if (!message) return;

    message.textContent = text;
    message.dataset.type = type;
    message.hidden = false;
}

function hideMessage() {
    const message = document.getElementById("link-application-message");
    if (!message) return;

    message.hidden = true;
    message.textContent = "";
    delete message.dataset.type;
}

async function submitApplication(form) {
    const section = document.getElementById(SECTION_ID);
    if (!section) return;

    const submitButton = form.querySelector('[type="submit"]');

    hideMessage();

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute("aria-busy", "true");
    }

    try {
        const response = await fetch(form.action, {
            method: form.method || "POST",
            body: new FormData(form),
            credentials: "same-origin",
        });

        const resultUrl = new URL(response.url);
        const applied = resultUrl.searchParams.get("applied");

        if (applied === "success") {
            showMessage(
                "success",
                section.dataset.successMessage
            );

            form.reset();
        } else {
            showMessage(
                "error",
                resultUrl.searchParams.get("message") ||
                section.dataset.errorMessage
            );
        }
    } catch {
        showMessage(
            "error",
            section.dataset.errorMessage
        );
    } finally {
        refreshCaptcha();

        const captchaCode = form.querySelector('[name="captchaCode"]');
        if (captchaCode) {
            captchaCode.value = "";
        }

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.removeAttribute("aria-busy");
        }
    }
}

function handleSubmit(event) {
    const form = event.target.closest(`#${FORM_ID}`);
    if (!form) return;

    event.preventDefault();
    submitApplication(form);
}

function handleClick(event) {
    const target = event.target.closest(
        '[data-link-apply-action="refresh-captcha"]'
    );

    if (!target) return;
    if (!target.closest(`#${SECTION_ID}`)) return;

    refreshCaptcha();
}

function registerLinkApplicationActions() {
    if (listenersRegistered) return;

    document.addEventListener("submit", handleSubmit);
    document.addEventListener("click", handleClick);

    listenersRegistered = true;
}

function initLinkApplication() {
    clearCaptchaTimer();

    if (!document.getElementById(SECTION_ID)) return;

    refreshCaptcha();
}

terminal.registerInitFunc(registerLinkApplicationActions);
terminal.registerRefresh(initLinkApplication);