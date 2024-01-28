// Función para guardar la polilínea en la base de datos
function savePolylineToDatabase(polyline) {
    // Crear un objeto que contenga las coordenadas de la polilínea y la descripción
    let polylineData = {
        latlngs: JSON.stringify(polyline.latlngs),
        description: polyline.description
    };

    // Guardar la polilínea en la base de datos
    fetch('/api/polylines', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(polylineData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('La polilínea se ha guardado correctamente en la base de datos:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

// Modificar el evento pm:create para almacenar la polilínea en la variable global y guardarla en la base de datos
map.on('pm:create', function(e) {
    let layer = e.layer;
    let latlngs = layer.getLatLngs();
    let polyline = {latlngs: latlngs, description: 'Descripción aquí'}; // Añade la descripción que necesites

    // Guardar la polilínea en la base de datos
    savePolylineToDatabase(polyline);
});