    // Recuperar las polilíneas del LocalStorage
    var polylinesJson = localStorage.getItem('polylines');
    if (polylinesJson) {
        var polylines = JSON.parse(polylinesJson);
        // Crear un div para cada polilínea
        polylines.forEach(function(polyline, index) {
            var polylineDiv = document.createElement('div');
            polylineDiv.style.display = 'flex';
            polylineDiv.style.justifyContent = 'space-between';
            polylineDiv.style.alignItems = 'center';
            polylineDiv.style.marginBottom = '1em';

            var button = document.createElement('button');
            button.textContent = 'Polilínea ' + (index + 1);
            button.onclick = function() {
                // Guardar el índice de la polilínea seleccionada en el LocalStorage
                localStorage.setItem('selectedPolylineIndex', index);

                // Redirigir al usuario a la vista principal
                window.location.href = '/principal';
            };

            // Crear un botón de eliminación para cada polilínea
            var deleteButton = document.createElement('button');
            deleteButton.classList.add('btn', 'btn-danger'); // Cambiar a 'btn-danger' para un botón rojo
            deleteButton.innerHTML = '<i class="bi bi-trash-fill"></i> Eliminar'; // Añadir icono de basurero
            deleteButton.onclick = function() {
                // Eliminar la polilínea del LocalStorage
                polylines.splice(index, 1);
                localStorage.setItem('polylines', JSON.stringify(polylines));

                // Eliminar los botones de la vista
                button.remove();
                deleteButton.remove();
                infoInput.remove();

            };

            // Crear un input para que el usuario escriba información adicional sobre la polilínea
            var infoInput = document.createElement('input');
            infoInput.type = 'text';
            infoInput.placeholder = 'Escribe información adicional aquí...';
            infoInput.style.width = '50%';
            infoInput.style.marginTop = '1em';
            infoInput.style.marginBottom = '1em';

            // Cargar el comentario del LocalStorage cuando se carga la página
            if (polyline.description) {
                infoInput.value = polyline.description;
            } else {
                infoInput.value = 'Introduce información adicional aquí...';
            }

            infoInput.onchange = function() {
                polyline.description = infoInput.value;
                localStorage.setItem('polylines', JSON.stringify(polylines));
            };

            // Añadir los botones al div de la polilínea
            polylineDiv.appendChild(button);
            polylineDiv.appendChild(deleteButton);
            // Añadir el input al div de la polilínea
            polylineDiv.appendChild(infoInput);

            // Añadir los botones a la vista de preguntas
            var container = document.getElementById('polylinesContainer');
            container.appendChild(polylineDiv);
        });
    }