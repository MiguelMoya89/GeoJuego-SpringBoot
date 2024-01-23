    // Script para el mapa en la página principal del juego en JavaScript
    let map = L.map('map', {
        minZoom: 2,
        maxZoom: 18
    }).setView([37.9922, -1.1307], 4);

    // Añadimos la funcionalidad de dibujar una polilínea y calcular su longitud
    map.on('pm:create', function(e) {
        let layer = e.layer;
        let latlngs = layer.getLatLngs();
        let distance = 0;

        for (let i = 0; i < latlngs.length - 1; i++) {
            distance += latlngs[i].distanceTo(latlngs[i + 1]);
        }

        let popupContent = 'Distancia: ' + (distance / 1000).toFixed(2) + ' km';
        layer.bindPopup(popupContent).openPopup();
    });

    // Habilita leaflet-geoman en el mapa con solo las opciones necesarias habilitadas.
    map.pm.addControls({
        position: 'topleft',
        drawMarker: true,
        drawPolyline: true,
        editMode: true,
        dragMode: false,
        cutPolygon: false,
        removalMode: true,
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

                // Muestra el nombre del lugar y las coordenadas debajo del mapa
                document.getElementById('info').innerHTML = 'Ubicación: ' + placeName + '<br>Coordenadas: ' + lat.toFixed(4) + ', ' + lng.toFixed(4);
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