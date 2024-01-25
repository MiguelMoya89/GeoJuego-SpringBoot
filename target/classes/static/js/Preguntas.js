        // Crear un mapa
        var map = L.map('map').setView([51.505, -0.09], 13);

        // Añadir capa de teselas
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);

        // Variable para almacenar el marcador
        var marker;

        // Evento para agregar un marcador al hacer clic
        map.on('click', function(e) {
            // Si ya hay un marcador, quítalo
            if (marker) {
                map.removeLayer(marker);
            }

            // Agrega un nuevo marcador
            marker = L.marker(e.latlng).addTo(map);
        });

        // Evento para enviar la ubicación del marcador
        document.getElementById('answerForm').addEventListener('submit', function(event) {
            event.preventDefault();

            // Si hay un marcador, obtén su ubicación
            if (marker) {
                var location = marker.getLatLng();

                // Aquí puedes enviar 'location' al servidor para procesarlo
                console.log(location);
            }
        });