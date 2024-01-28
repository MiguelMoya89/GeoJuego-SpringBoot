// Evento para enviar la ubicación del marcador
document.getElementById('answerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Si hay un marcador, obtén su ubicación
    if (marker) {
        var location = marker.getLatLng();

        // Realiza una solicitud POST al servidor con la ubicación del marcador
        fetch('/api/enviarUbicacion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ latitud: location.lat, longitud: location.lng }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta del servidor:', data);
            // Aquí puedes manejar la respuesta del servidor si es necesario
        })
        .catch(error => {
            console.error('Error al enviar la ubicación:', error);
        });
    }
});

