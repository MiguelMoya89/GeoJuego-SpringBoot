
    document.getElementById('answerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtén la respuesta seleccionada por el usuario
        var userAnswer = document.querySelector('input[name="answer"]:checked').value;

        // Obtén la respuesta correcta del elemento oculto en el HTML
        var correctAnswer = document.getElementById('correctAnswer').textContent;

        // Compara la respuesta del usuario con la respuesta correcta
        if (userAnswer === correctAnswer) {
            // Si las respuestas coinciden, la respuesta del usuario es correcta
            document.getElementById('result').textContent = 'Tu respuesta es correcta.';
        } else {
            // Si las respuestas no coinciden, la respuesta del usuario es incorrecta
            document.getElementById('result').textContent = 'Tu respuesta es incorrecta.';
        }

        // Solicita una nueva pregunta al servidor
        fetch('/preguntas')
            .then(response => response.json())
            .then(data => {
                // Actualiza el HTML con la nueva pregunta
                document.getElementById('question').textContent = data.pregunta;
                document.getElementById('correctAnswer').textContent = data.respuestaCorrecta;
                // Aquí debes actualizar las respuestas también
            })
            .catch(error => console.error('Error:', error));
    });