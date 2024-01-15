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
        } else {
            audio.pause();
        }
    });

    const volume = document.querySelector('#volume');
    volume.addEventListener('input', function() {
        audio.volume = volume.value;
    });
});