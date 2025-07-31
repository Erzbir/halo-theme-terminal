function type() {
    document.addEventListener('DOMContentLoaded', () => {
        let typedTextContainer = document.querySelector('.typed-text');
        if (!typedTextContainer) {
            return;
        }

        function typeWriter(container) {
            let text = container.innerText;
            container.innerText = '';
            let i = 0;

            function _type() {
                if (i < text.length) {
                    container.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(_type, Math.random() * 200 + 50);
                }
            }

            _type();
        }

        typeWriter(typedTextContainer);
    })
}

terminal.registerRefresh(type);