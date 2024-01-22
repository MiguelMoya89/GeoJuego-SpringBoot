function addAnimation(buttonId) {
    const button = document.querySelector(buttonId);

    button.addEventListener('click', () => {
        button.style.animation = "rubberBand 1s 1";
        setTimeout(() => {
            button.style.animation = "";
        }, 2000);
    });
}

addAnimation('.animated-button');
addAnimation('#searchButton');
addAnimation('#locationButton');
