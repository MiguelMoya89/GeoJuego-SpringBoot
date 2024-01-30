    function addAnimation(buttonId) {
        const button = document.querySelector(buttonId);

        if (button) {
            button.addEventListener('click', () => {
                button.style.animation = "rubberBand 1s 1";
                setTimeout(() => {
                    button.style.animation = "";
                }, 2000);
            });
        } else {
            const button = document.querySelector(buttonId);
        }
    }

    document.addEventListener('DOMContentLoaded', (event) => {
        addAnimation('.animated-button');
        addAnimation('#searchButton');
        addAnimation('#locationButton');
    });
