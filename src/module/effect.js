import {terminal} from "../terminal.js";

const TYPED_TEXT_SELECTOR = ".typed-text";
const TYPED_FLAG = "typed";
const MIN_TYPE_DELAY = 50;
const TYPE_DELAY_VARIANCE = 200;

function getTypeDelay() {
    return Math.random() * TYPE_DELAY_VARIANCE + MIN_TYPE_DELAY;
}

function typeWriter(container) {
    if (!container || container.dataset[TYPED_FLAG] === "true") return;

    const text = container.textContent || "";
    container.dataset[TYPED_FLAG] = "true";
    container.textContent = "";

    let index = 0;

    function writeNextCharacter() {
        if (index >= text.length) return;

        container.textContent += text.charAt(index);
        index++;
        window.setTimeout(writeNextCharacter, getTypeDelay());
    }

    writeNextCharacter();
}

function typeTypedText() {
    document.querySelectorAll(TYPED_TEXT_SELECTOR).forEach(typeWriter);
}

terminal.registerRefresh(typeTypedText);
