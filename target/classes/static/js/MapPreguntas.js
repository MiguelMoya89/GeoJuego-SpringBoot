// Script para el mapa en la página principal del juego en JavaScript
let map = L.map('map', {
    minZoom: 2,
    maxZoom: 18
}).setView([37.9922, -1.1307], 4);

// Habilita leaflet-geoman en el mapa con solo las opciones necesarias habilitadas.
map.pm.addControls({
    position: 'topleft',
    drawMarker: true,
    drawPolyline: false,
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

function onMapClick(e) {
    let lat = e.latlng.lat;
    let lng = e.latlng.lng;

    // Si ya hay un marcador en el mapa, lo eliminamos
    if (marker) {
        map.removeLayer(marker);
    }

    // Añadimos el nuevo marcador al mapa
    marker = L.marker([lat, lng]).addTo(map);

    // Enviamos las coordenadas de la ubicación en la que el usuario hizo clic al servidor
    fetch('/respuesta', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            respuestaSeleccionada: lat + ',' + lng,
        }),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Comprueba si la respuesta contiene una propiedad 'mensaje'
        if (data && data.hasOwnProperty('mensaje')) {
            // Muestra el mensaje de respuesta del servidor
            alert(data.mensaje);
        } else {
            throw new Error('Response does not have a mensaje property');
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Añadimos el evento de clic en el mapa
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