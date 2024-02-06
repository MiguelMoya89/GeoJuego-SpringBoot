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
        drawMarker: false,
        drawPolyline: true,
        editMode: false,
        dragMode: false,
        cutPolygon: false,
        removalMode: false,
        drawCircle: false,
        drawCircleMarker: false,
        drawRectangle: false,
        drawPolygon: false,
        drawText: false,
        rotateMode: false,
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


    let currentLocationName;
    // Comprueba si la respuesta del usuario es correcta
    function checkAnswer(answer) {
        // Comprueba si la respuesta del usuario es correcta
        const isCorrect = answer.toLowerCase() === currentLocationName.toLowerCase();
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
            // Actualiza el contador de respuestas correctas en la vista
            document.getElementById('correctAnswerCount').textContent = correctAnswerCount;
        } else {
            alert('Respuesta incorrecta. Inténtalo de nuevo.');
        }

        // Vacía el campo de respuesta
        document.getElementById('answer').value = '';

        // Genera una nueva pregunta
        getNewQuestion();
    });

    function getNewQuestion() {
        // Elige una ubicación aleatoria del conjunto de ubicaciones en tierra
        const indice = Math.floor(Math.random() * ubicacionesEnTierra.length);
        const { latitud, longitud, nombre } = ubicacionesEnTierra[indice];

        // Almacena el nombre de la ubicación actual
        currentLocationName = nombre;

        // Actualiza la ubicación en el mapa
        map.setView([latitud, longitud], 4);
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker([latitud, longitud]).addTo(map);
    }

    // Conjunto de ubicaciones en tierra
    const ubicacionesEnTierra = [
        { latitud: 37.7749, longitud: -122.4194, nombre: 'San Francisco' },
        { latitud: 51.5074, longitud: -0.1278, nombre: 'Londres' },
        { latitud: 35.6895, longitud: 139.6917, nombre: 'Tokio' },
        { latitud: 40.7128, longitud: -74.0060, nombre: 'New York' },
        { latitud: 41.9028, longitud: 12.4964, nombre: 'Roma' },
        { latitud: 48.8566, longitud: 2.3522, nombre: 'Paris' },
        { latitud: 55.7558, longitud: 37.6173, nombre: 'Moscu' },
        { latitud: 52.5200, longitud: 13.4050, nombre: 'Berlin' },
        { latitud: 19.4326, longitud: -99.1332, nombre: 'Ciudad de Mexico' },
        { latitud: 31.2304, longitud: 121.4737, nombre: 'Shanghai' },
        { latitud: 39.9042, longitud: 116.4074, nombre: 'Beijing' },
        { latitud: 35.6762, longitud: 139.6503, nombre: 'Yokohama' },
        { latitud: 22.3964, longitud: 114.1095, nombre: 'Hong Kong' },
        { latitud: 37.5665, longitud: 126.9780, nombre: 'Seul' },
        { latitud: 23.1291, longitud: 113.2644, nombre: 'Guangzhou' },
        { latitud: 34.0522, longitud: -118.2437, nombre: 'Los Angeles' },
        { latitud: 41.8781, longitud: -87.6298, nombre: 'Chicago' },
        { latitud: 51.1657, longitud: 10.4515, nombre: 'Alemania' },
        { latitud: 60.4720, longitud: 8.4689, nombre: 'Noruega' },
        { latitud: 40.4168, longitud: -3.7038, nombre: 'Madrid' },
        { latitud: 45.4642, longitud: 9.1900, nombre: 'Milan' },
        { latitud: 52.2297, longitud: 21.0122, nombre: 'Varsovia' },
        { latitud: 41.0082, longitud: 28.9784, nombre: 'Estambul' },
        { latitud: 59.9139, longitud: 10.7522, nombre: 'Oslo' },
        { latitud: 59.3293, longitud: 18.0686, nombre: 'Estocolmo' },
        { latitud: 52.3702, longitud: 4.8952, nombre: 'Amsterdam' },
        { latitud: 48.8566, longitud: 2.3522, nombre: 'Paris' },
        { latitud: 50.0755, longitud: 14.4378, nombre: 'Praga' },
        { latitud: 41.9028, longitud: 12.4964, nombre: 'Roma' },
        { latitud: 45.8150, longitud: 15.9819, nombre: 'Zagreb' },
        { latitud: 52.5200, longitud: 13.4050, nombre: 'Berlin' },
        { latitud: 47.4979, longitud: 19.0402, nombre: 'Budapest' },
        { latitud: 48.2082, longitud: 16.3738, nombre: 'Viena' },
        { latitud: 50.8503, longitud: 4.3517, nombre: 'Bruselas' },
        { latitud: 55.6761, longitud: 12.5683, nombre: 'Copenhague' },
        { latitud: 59.9139, longitud: 10.7522, nombre: 'Oslo' },
        { latitud: 59.3293, longitud: 18.0686, nombre: 'Estocolmo'},
        { latitud: 6.5244, longitud: 3.3792, nombre: 'Lagos' },
        { latitud: 33.8869, longitud: 9.5375, nombre: 'Tunez' },
        { latitud: 40.4168, longitud: -3.7038, nombre: 'Madrid' },
        { latitud: 41.3851, longitud: 2.1734, nombre: 'Barcelona' },
        { latitud: 14.4974, longitud: -14.4524, nombre: 'Senegal' },
        { latitud: 31.7917, longitud: -7.0926, nombre: 'Marruecos' },
        { latitud: 28.0339, longitud: 1.6596, nombre: 'Argelia' },
        { latitud: 14.7167, longitud: -17.4677, nombre: 'Dakar' },
        { latitud: 37.9922, longitud: -1.1307, nombre: 'Murcia' },
        { latitud: 38.2418, longitud: -1.6983, nombre: 'Calasparra'},
        { latitud: 37.9689, longitud: -1.2135, nombre: 'Alcantarilla'},
    ];

    function generarUbicacionAleatoria() {
        // Elige una ubicación aleatoria del conjunto de ubicaciones en tierra
        const indice = Math.floor(Math.random() * ubicacionesEnTierra.length);
        return ubicacionesEnTierra[indice];
    }

    // Genera la primera pregunta cuando se carga la página
    window.onload = getNewQuestion;

