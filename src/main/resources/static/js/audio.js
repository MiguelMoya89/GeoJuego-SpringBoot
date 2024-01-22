document.addEventListener('DOMContentLoaded', function() {
    //let audio = new Audio('https://25493.live.streamtheworld.com/RADIOMARCA_NACIONAL.mp3');
    let audio = new Audio('https://www.partyviberadio.com:8069/;listen.pls?sid=1');
    audio.volume = 0.5;
    audio.autoplay = false;
    audio.load();

    const button = document.querySelector('#play');
    button.addEventListener('click', function() {
        if (audio.paused) {
            audio.play();
            button.style.boxShadow = '';  // Elimina el efecto de sombra al botón
            button.style.color = 'white';  // Cambia el color del botón a blanco
        } else {
            audio.pause();
            button.style.boxShadow = '1px 1px 3px 3px #ccc';  // Añade un efecto de sombra al botón
            button.style.color = '';  // Restaura el color original del botón
        }
    });

    const volume = document.querySelector('#volume');
    volume.addEventListener('input', function() {
        audio.volume = volume.value;
    });

    const speed = document.querySelector('#speed');
    speed.addEventListener('input', function() {
        audio.playbackRate = speed.value;
    });
});