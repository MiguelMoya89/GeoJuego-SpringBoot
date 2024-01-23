    //Script relacionado con las respuestas
    // respuestas.js
    function onMapClick(e) {
        lat = e.latlng.lat;
        lng = e.latlng.lng;

        // Si ya hay un marcador en el mapa y no es permanente, lo eliminamos
        if (marker && !permanentMarkers.has(marker)) {
            map.removeLayer(marker);
        }

        // Añadimos el nuevo marcador al mapa
        marker = L.marker([lat, lng]).addTo(map);

        // Actualizamos las variables expandLat y expandLng solo cuando se establece un nuevo marcador
        expandLat = lat;
        expandLng = lng;

        // Envía las coordenadas de la ubicación en la que se hizo clic al servidor
        fetch('/respuesta', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pregunta: '¿Cuál es la capital de Francia?', // Aquí deberías poner la pregunta actual
                respuestaSeleccionada: [lat, lng],
            }),
        })
        .then(response => response.json())
        .then(data => {
            // Muestra el mensaje de si la respuesta es correcta o no
            alert(data.mensaje);
        })
        .catch(error => console.error('Error:', error));
    }

    // Añadimos el evento de doble clic en el mapa
    map.on('click', onMapClick);

    window.onload = function() {
        if (window.esCorrecta !== 'default') {
            alert(window.mensaje);
        }
    }