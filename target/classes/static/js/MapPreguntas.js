    // Script para el mapa en la página principal del juego en JavaScript
    let map = L.map('map', {
        minZoom: 2,
        maxZoom: 18,
        maxBounds: [
            [-90, -180],
            [90, 180]
        ]
    }).setView([37.9922, -1.1307], 4);

    let correctAnswerCount = 0;

    // Añadimos la funcionalidad de dibujar una polilínea y calcular su longitud
    map.on('pm:create', function(e) {
        let layer = e.layer;

        if (layer instanceof L.Polyline) {
            let latlngs = layer.getLatLngs();
            let distance = 0;

            for (let i = 0; i < latlngs.length - 1; i++) {
                distance += latlngs[i].distanceTo(latlngs[i + 1]);
            }

            let popupContent = 'Distancia: ' + (distance / 1000).toFixed(2) + ' km';
            layer.bindPopup(popupContent).openPopup();
        }
    });

    // Habilita leaflet-geoman en el mapa con solo las opciones necesarias habilitadas.
    map.pm.addControls({
        position: 'topleft',
        drawMarker: true,
        drawPolyline: true,
        editMode: false,
        dragMode: false,
        cutPolygon: false,
        removalMode: false,
        drawCircle: false,
        drawCircleMarker: false,
        drawRectangle: false,
        drawPolygon: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let marker;
    let permanentMarkers = new Set();

    // Definimos las variables lat, lng, expandLat y expandLng en el ámbito global
    let lat, lng, expandLat, expandLng;

    function onMapClick(e) {
        lat = e.latlng.lat;
        lng = e.latlng.lng;

        // Si ya hay un marcador en el mapa y no es permanente, lo eliminamos
        if (marker && !permanentMarkers.has(marker)) {
            map.removeLayer(marker);
        }

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            .then(response => response.json())
            .then(data => {
                let placeName = data.display_name;
                // Añadimos el nuevo marcador al mapa
                marker = L.marker([lat, lng]).addTo(map)
                    .bindPopup(placeName).openPopup();

                // Actualizamos las variables expandLat y expandLng solo cuando se establece un nuevo marcador
                expandLat = lat;
                expandLng = lng;
            })
            .catch(error => console.error('Error:', error));
    }

    // Añadimos el evento de doble clic en el mapa
    map.on('click', onMapClick);

    //añade un boton para limpiar todos los elementos del mapa
    let clearButton = L.control({position: 'topleft'});
    clearButton.onAdd = function (map) {
        let div = L.DomUtil.create('div', 'clear-button');
        div.innerHTML = '<button id="clearButton">Limpiar mapa</button>';
        return div;
    };
    clearButton.addTo(map);

    //funcion para limpiar el mapa
    function clearMap() {
        // Elimina todas las formas del mapa
        map.eachLayer(function(layer) {
            if (layer instanceof L.Marker || layer instanceof L.Polyline) {
                map.removeLayer(layer);
            }
        });
    }

    // Detiene la propagación del evento de clic en el botón de limpieza
    document.getElementById('clearButton').addEventListener('click', function(e) {
        e.stopPropagation();
        clearMap();
    });

    function checkAnswer(answer) {
        // Comprueba si la respuesta del usuario es correcta
        const ubicacionElement = document.getElementById('ubicacion');
        const isCorrect = ubicacionElement ? answer === ubicacionElement.value : false;
        if (isCorrect) {
            alert('¡Respuesta correcta!');
        } else {
            alert('Respuesta incorrecta.');
        }
        return isCorrect;
    }

    document.getElementById('answerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtiene la respuesta del usuario
        const answer = document.getElementById('answer').value;

        // Comprueba si la respuesta es correcta
        const isCorrect = checkAnswer(answer);

        // Actualiza el contador de respuestas correctas
        if (isCorrect) {
            correctAnswerCount++;
            alert('Respuesta correcta! Llevas ' + correctAnswerCount + ' respuestas correctas.');
        } else {
            alert('Respuesta incorrecta. Inténtalo de nuevo.');
        }

        // Genera una nueva pregunta
        getNewQuestion();
    });

    function getNewQuestion() {
        // Elige una ubicación aleatoria del conjunto de ubicaciones en tierra
        const indice = Math.floor(Math.random() * ubicacionesEnTierra.length);
        const { latitud, longitud } = ubicacionesEnTierra[indice];

        // Actualiza la ubicación en el mapa
        map.setView([latitud, longitud], 4);
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([latitud, longitud]).addTo(map);
    }

    function getNewQuestion() {
        // Genera una ubicación aleatoria
        const { latitud, longitud } = generarUbicacionAleatoria();

        // Actualiza la ubicación en el mapa
        map.setView([latitud, longitud], 4);
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([latitud, longitud]).addTo(map);
    }

    const ubicacionesEnTierra = [
        { latitud: 37.7749, longitud: -122.4194 }, // San Francisco, USA
        { latitud: 51.5074, longitud: -0.1278 }, // Londres, Reino Unido
        { latitud: 35.6895, longitud: 139.6917 }, // Tokio, Japón
        // Agrega más ubicaciones aquí...
        { latitud: 40.4168, longitud: -3.7038 }, // Madrid, España
        { latitud: 48.8566, longitud: 2.3522 }, // París, Francia
        { latitud: 52.5200, longitud: 13.4050 }, // Berlín, Alemania
        { latitud: 55.7558, longitud: 37.6173 }, // Moscú, Rusia
        { latitud: 41.9028, longitud: 12.4964 }, // Roma, Italia
        { latitud: 52.3702, longitud: 4.8952 }, // Ámsterdam, Países Bajos
        { latitud: 59.3293, longitud: 18.0686 }, // Estocolmo, Suecia
        { latitud: 59.9139, longitud: 10.7522 }, // Oslo, Noruega
        { latitud: 55.6761, longitud: 12.5683 }, // Copenhague, Dinamarca
        { latitud: 52.2297, longitud: 21.0122 }, // Varsovia, Polonia
        { latitud: 50.0755, longitud: 14.4378 }, // Praga, República Checa
        { latitud: 47.4979, longitud: 19.0402 }, // Budapest, Hungría
        { latitud: 48.2082, longitud: 16.3738 }, // Viena, Austria
        { latitud: 46.0569, longitud: 14.5058 }, // Liubliana, Eslovenia
        { latitud: 45.8150, longitud: 15.9819 }, // Zagreb, Croacia
        { latitud: 43.8563, longitud: 18.4131 }, // Sarajevo, Bosnia y Herzegovina
        { latitud: 42.6977, longitud: 23.3219 }, // Sofía, Bulgaria
        { latitud: 41.3275, longitud: 19.8187 }, // Tirana, Albania
        { latitud: 42.6629, longitud: 21.1655 }, // Pristina, Kosovo
        { latitud: 42.4304, longitud: 19.2594 }, // Podgorica, Montenegro
        { latitud: 41.9973, longitud: 21.4280 }, // Skopie, Macedonia del Norte
        { latitud: 47.0105, longitud: 28.8638 }, // Chisináu, Moldavia
        { latitud: 47.1625, longitud: 27.5833 }, // Iasi, Rumanía
        { latitud: 44.4268, longitud: 26.1025 }, // Bucarest, Rumanía
        { latitud: 42.6977, longitud: 23.3219 }, // Sofía, Bulgaria
        { latitud: 45.8150, longitud: 15.9819 }, // Zagreb, Croacia
        { latitud: 43.8563, longitud: 18.4131 }, // Sarajevo, Bosnia y Herzegovina
        { latitud: 42.6977, longitud: 23.3219 }, // Sofía, Bulgaria
        { latitud: 41.3275, longitud: 19.8187 }, // Tirana, Albania
        { latitud: 42.6629, longitud: 21.1655 }, // Pristina, Kosovo
        { latitud: 42.4304, longitud: 19.2594 }, // Podgorica, Montenegro
        { latitud: 41.9973, longitud: 21.4280 }, // Skopie, Macedonia del Norte
        { latitud: 47.0105, longitud: 28.8638 }, // Chisináu, Moldavia
        { latitud: 47.1625, longitud: 27.5833 }, // Iasi, Rumanía
        { latitud: 44.4268, longitud: 26.1025 }, // Bucarest, Rumanía
        { latitud: 42.6977, longitud: 23.3219 }, // Sofía, Bulgaria
        { latitud: 45.8150, longitud: 15.9819 }, // Zagreb, Croacia
        { latitud: 43.8563, longitud: 18.4131 }, // Sarajevo, Bosnia y Herzegovina
        { latitud: 42.6977, longitud: 23.3219 }, // Sofía, Bulgaria
        { latitud: 41.3275, longitud: 19.8187 }, // Tirana, Albania
        { latitud: 42.6629, longitud: 21.1655 }, // Pristina, Kosovo
        { latitud: 42.4304, longitud: 19.2594 }, // Podgorica, Montenegro
        { latitud: 41.9973, longitud: 21.4280 }, // Skopie, Macedonia del Norte
        { latitud: 47.0105, longitud: 28.8638 }, // Chisináu, Moldavia
        { latitud: 47.1625, longitud: 27.5833 }, // Iasi, Rumanía
        { latitud: 44.4268, longitud: 26.1025 }, // Bucarest, Rumanía
        { latitud: 42.6977, longitud: 23.3219 }, // Sofía, Bulgaria
        { latitud: 45.8150, longitud: 15.9819 }, // Zagreb, Croacia
        { latitud: 43.8563, longitud: 18.4131 }, // Sarajevo, Bosnia y Herzegovina
        { latitud: 42.6977, longitud: 23.3219 }, // Sofía, Bulgaria
        { latitud: 41.3275, longitud: 19.8187 }, // Tirana, Albania
        { latitud: 42.6629, longitud: 21.1655 }, // Pristina, Kosovo
        { latitud: 42.4304, longitud: 19.2594 }, // Podgorica, Montenegro
        { latitud: 41.9973, longitud: 21.4280 }, // Skopie, Macedonia del Norte
        { latitud: 47.0105, longitud: 28.8638 }, // Chisináu, Moldavia
        { latitud: 47.1625, longitud: 27.5833 }, // Iasi, Rumanía
        { latitud: 44.4268, longitud: 26.1025 }, // Bucarest, Rumanía
    ];

    function generarUbicacionAleatoria() {
        // Elige una ubicación aleatoria del conjunto de ubicaciones en tierra
        const indice = Math.floor(Math.random() * ubicacionesEnTierra.length);
        return ubicacionesEnTierra[indice];
    }

    // Genera la primera pregunta cuando se carga la página
    window.onload = getNewQuestion;