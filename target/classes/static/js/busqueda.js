document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.d-flex');

    // Crea un grupo de capas para los marcadores
    let markersGroup = L.layerGroup().addTo(map);

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const query = searchForm.querySelector('input[name="query"]').value;
        const postalCode = searchForm.querySelector('input[name="postalCode"]').value;

        fetch(`https://nominatim.openstreetmap.org/search?format=json&street=${query}&postalcode=${postalCode}`)
            .then(response => response.json())
            .then(data => {
                // Filtra los resultados para incluir solo aquellos con el código postal correcto
                const filteredData = data.filter(location => location.display_name.includes(postalCode));

                if (filteredData.length > 0) {
                    // Elimina los marcadores existentes
                    markersGroup.clearLayers();

                    // Si solo hay un resultado, haz zoom en esa ubicación
                    if (filteredData.length === 1) {
                        map.setView([filteredData[0].lat, filteredData[0].lon], 10);
                    }

                    // Añade un marcador al mapa para cada ubicación encontrada
                    filteredData.forEach(location => {
                        let marker = L.marker([location.lat, location.lon]);
                        marker.addTo(markersGroup);
                    });
                } else {
                    console.log('No se encontraron resultados para la búsqueda:', query, postalCode);
                }
            })
            .catch(error => {
                console.log('Error al realizar la búsqueda:', error);
            });
    });
});