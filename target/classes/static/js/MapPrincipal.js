
     // Script para el mapa en la página principal del juego en JavaScript
     let map = L.map('map', {
         minZoom: 2,
         maxZoom: 18
     }).setView([37.9922, -1.1307], 4);

     // Habilita leaflet-geoman en el mapa con todas las opciones habilitadas.
     map.pm.addControls({
         position: 'topleft',
         drawCircle: false,
         drawPolyline: true,
     });

     // Personaliza el estilo de la capa dibujada
     map.pm.setPathOptions({
         color: "orange",
         fillColor: "green",
         fillOpacity: 0.4,
     });

     // Excluye formas de recibir estas opciones de ruta
     map.pm.setPathOptions(
         { color: "orange" },
         {
             ignoreShapes: ["Circle", "Rectangle"],
         }
     );

     // Fusiona el nuevo estilo con el actual
     map.pm.setPathOptions(
         { color: "orange" },
         {
             merge: true,
         }
     );

     let marker;
     let permanentMarkers = new Set();

     // Definimos las variables lat, lng, expandLat y expandLng en el ámbito global
     let lat, lng, expandLat, expandLng;

     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
         attribution: '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
     }).addTo(map);

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

                 // Desactivamos el evento de doble clic en el mapa
                 map.doubleClickZoom.disable();

                 // Si hacemos doble clic en el marcador, lo hacemos permanente o lo eliminamos
                 marker.on('dblclick', function() {
                     if (permanentMarkers.has(this)) {
                         // Si el marcador es permanente, lo eliminamos
                         map.removeLayer(this);
                         permanentMarkers.delete(this);
                     } else {
                         // Si el marcador no es permanente, lo hacemos permanente
                         permanentMarkers.add(this);
                     }

                     // Reactivamos el evento de doble clic en el mapa
                     map.doubleClickZoom.enable();
                 });
             })
             .catch(error => console.error('Error:', error));
     }

     // Añadimos el evento de doble clic en el mapa
     map.on('click', onMapClick);

     // Añadimos la funcionalidad de dibujar una polilínea y calcular su longitud
     map.on('pm:create', function(e) {
         let layer = e.layer;
         let latlngs = layer.getLatLngs();
         let distance = 0;

         for (let i = 0; i < latlngs.length - 1; i++) {
             distance += latlngs[i].distanceTo(latlngs[i + 1]);
         }

         // Si la forma es un polígono, un rectángulo o una polilínea, calculamos la longitud de cada lado
         if (e.shape === 'Polygon' || e.shape === 'Rectangle') {
             let points = (e.shape === 'Polyline') ? latlngs : latlngs[0];
             for (let i = 0; i < points.length - 1; i++) {
                 distance += points[i].distanceTo(points[i + 1]);
             }
             // También calculamos la distancia entre el último y el primer punto para cerrar la forma si es un polígono o un rectángulo
             if (e.shape === 'Polygon' || e.shape === 'Rectangle') {
                 distance += points[points.length - 1].distanceTo(points[0]);
             }
         }
         // Si la forma es un círculo, calculamos la circunferencia
         else if (e.shape === 'Circle') {
             let radius = layer.getRadius();
             distance = 2 * Math.PI * radius;
         }

         let popupContent = 'Distancia: ' + (distance / 1000).toFixed(2) + ' km';
         layer.bindPopup(popupContent).openPopup();

         // Guardar las polilíneas en el LocalStorage solo si no están vacías
         if (latlngs.length > 1) {
             let polylines = [];
             let polylinesJson = localStorage.getItem('polylines');

             if (polylinesJson) {
                 polylines = JSON.parse(polylinesJson);
             }

             // Crear un prompt para que el usuario introduzca una descripción
             let description = prompt("Por favor, introduce una descripción para la polilínea:");

             // Guardar un objeto que contenga las coordenadas de la polilínea y la descripción
             let polyline = {latlngs: latlngs, description: description};
             polylines.push(polyline);
             localStorage.setItem('polylines', JSON.stringify(polylines));

             const data = JSON.stringify({ polylines: polylines });
             const url = 'http://localhost:9000/guardarPoly';

             // Enviar los datos al servidor
             fetch(url, {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: data
             }).then(response => response.json())
                 .then(data => {
                     // Verificar si la polilínea se ha guardado correctamente
                     let savedPolylinesJson = localStorage.getItem('polylines');
                     if (savedPolylinesJson) {
                         let savedPolylines = JSON.parse(savedPolylinesJson);
                         if (savedPolylines && savedPolylines.some(savedPolyline => JSON.stringify(savedPolyline) === JSON.stringify(polyline))) {
                             // Mostrar indicador de éxito
                             alert('La polilínea se ha guardado correctamente.');
                         }
                     }
                 })
                 .catch(error => console.error('Error:', error));
            }
        });

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
             if (layer instanceof L.Rectangle || layer instanceof L.Circle || layer instanceof L.Polygon || layer instanceof L.Polyline || layer instanceof L.Marker) {
                 map.removeLayer(layer);
             }
         });
     }

     // Detiene la propagación del evento de clic en el botón de limpieza
     document.getElementById('clearButton').addEventListener('click', function(e) {
         e.stopPropagation();
         clearMap();
     });

     // Añade un botón de expansión al mapa
     let expandButton = L.control({position: 'topleft'});
     expandButton.onAdd = function (map) {
         let div = L.DomUtil.create('div', 'expand-button');
         div.innerHTML = '<button id="expandButton">Expandir Rapida</button>';
         return div;
     };
     expandButton.addTo(map);

     // Añade un botón de reducción al mapa
     let reduceButton = L.control({position: 'topleft'});
     reduceButton.onAdd = function (map) {
         let div = L.DomUtil.create('div', 'reduce-button');
         div.innerHTML = '<button id="reduceButton">Reducir Rapida</button>';
         return div;
     };
     reduceButton.addTo(map);

     // Función para expandir el mapa
     function expandMap() {
         if (expandLat && expandLng) {
             map.setView([expandLat, expandLng], 14);
         } else {
             alert('Por favor, marca un punto en el mapa primero.');
         }
     }

     // Función para reducir el mapa
     function reduceMap() {
         if (expandLat && expandLng) {
             map.setView([expandLat, expandLng], 6);
         } else {
             alert('Por favor, marca un punto en el mapa primero.');
         }
     }

     // Detiene la propagación del evento de clic en los botones
     document.getElementById('expandButton').addEventListener('click', function(e) {
         e.stopPropagation();
         expandMap();
     });

     document.getElementById('reduceButton').addEventListener('click', function(e) {
         e.stopPropagation();
         reduceMap();
     });

       function getMyLocation() {
           // Verificar si el navegador soporta la geolocalización
           if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition(function(position) {
                   // Obtener las coordenadas de la ubicación actual
                   var lat = position.coords.latitude;
                   var lng = position.coords.longitude;

                   // Centrar el mapa en la ubicación actual
                   map.setView([lat, lng], 13);

                   // Agregar un marcador en la ubicación actual
                   var marker = L.marker([lat, lng]).addTo(map);

                   // Obtener los datos de la ubicación actual
                   fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                       .then(response => response.json())
                       .then(data => {
                           // Mostrar los datos de la ubicación en un popup en el marcador
                           marker.bindPopup(data.display_name).openPopup();
                       })
                       .catch(error => console.error('Error:', error));
               }, function(error) {
                   // Manejar los errores
                   switch(error.code) {
                       case error.PERMISSION_DENIED:
                           alert("El usuario no permitió la solicitud de geolocalización.");
                           break;
                       case error.POSITION_UNAVAILABLE:
                           alert("La información de la ubicación no está disponible.");
                           break;
                       case error.TIMEOUT:
                           alert("La solicitud para obtener la ubicación del usuario ha expirado.");
                           break;
                       case error.UNKNOWN_ERROR:
                           alert("Ha ocurrido un error desconocido.");
                           break;
                   }
               });
           } else {
               // El navegador no soporta la geolocalización
               alert("Tu navegador no soporta la geolocalización.");
           }
       }


     // Recuperar el índice de la polilínea seleccionada del LocalStorage
          let selectedPolylineIndex = localStorage.getItem('selectedPolylineIndex');
          if (selectedPolylineIndex !== null) {
              // Recuperar las polilíneas del LocalStorage
              let polylinesJson = localStorage.getItem('polylines');
              if (polylinesJson) {
                  let polylines = JSON.parse(polylinesJson);

                  // Recuperar la polilínea seleccionada
                  let selectedPolyline = polylines[selectedPolylineIndex];

                  // Dibujar la polilínea seleccionada en el mapa
                  let latlngs = selectedPolyline.latlngs.map(function(point) {
                      return [point.lat, point.lng];
                  });
                  let polyline = L.polyline(latlngs).addTo(map);

                  // Calcular la distancia total de la polilínea
                  let distance = 0;
                  for (let i = 0; i < latlngs.length - 1; i++) {
                      distance += map.distance(latlngs[i], latlngs[i + 1]);
                  }

                  // Mostrar la distancia total en un popup en la polilínea
                  let popupContent = 'Distancia total: ' + (distance / 1000).toFixed(2) + ' km';
                  polyline.bindPopup(popupContent).openPopup();
              }
          }

              // Variable global para almacenar la última polilínea creada
              let lastCreatedPolyline = null;

              // Modificar el evento pm:create para almacenar la polilínea en la variable global
              map.on('pm:create', function(e) {
                  let layer = e.layer;
                  let latlngs = layer.getLatLngs();
                  lastCreatedPolyline = {latlngs: latlngs};
              });

         // Función para guardar la polilínea en un archivo JSON
         function savePolylineToFile() {
             if (lastCreatedPolyline) {
                 let blob = new Blob([JSON.stringify(lastCreatedPolyline)], {type: "application/json;charset=utf-8"});
                 let filename = 'polyline.json';
                 saveAs(blob, filename);
             } else {
                 alert('No hay ninguna polilínea para guardar.');
             }
         }

         // Función para cargar una polilínea desde un archivo JSON
         function loadPolylineFromFile() {
             let input = document.createElement('input');
             input.type = 'file';
             input.accept = 'application/json';
             input.onchange = function(event) {
                 let file = event.target.files[0];
                 let reader = new FileReader();
                 reader.onload = function(event) {
                     let polyline = JSON.parse(event.target.result);
                     // Dibuja la polilínea en el mapa
                     L.polyline(polyline.latlngs).addTo(map);
                 };
                 reader.readAsText(file);
             };
             input.click();
         }

         // Agregar un botón para guardar la polilínea
         let saveButton = L.control({position: 'topleft'});
         saveButton.onAdd = function (map) {
             let div = L.DomUtil.create('div', 'save-button');
             div.innerHTML = '<button id="saveButton">Guardar polilínea</button>';
             return div;
         };
         saveButton.addTo(map);
         document.getElementById('saveButton').addEventListener('click', function(e) {
             e.stopPropagation();
             savePolylineToFile();
         });

         // Agregar un botón para cargar una polilínea
         let loadButton = L.control({position: 'topleft'});
         loadButton.onAdd = function (map) {
             let div = L.DomUtil.create('div', 'load-button');
             div.innerHTML = '<button id="loadButton">Cargar polilínea</button>';
             return div;
         };
         loadButton.addTo(map);
         document.getElementById('loadButton').addEventListener('click', function(e) {
             e.stopPropagation();
             loadPolylineFromFile();
         });