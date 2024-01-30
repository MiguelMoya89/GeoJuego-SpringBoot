package com.example.registrationlogindemo.entity;

import java.util.List;


public class Preguntas {
    private String pregunta;
    private List<String> respuestas;
    private String respuestaCorrecta;


    public void agregarPreguntaYRespuesta(String pregunta, List<String> respuestas, String respuestaCorrecta) {
        this.pregunta = pregunta;
        this.respuestas = respuestas;
        this.respuestaCorrecta = respuestaCorrecta;
    }

    public String obtenerPregunta() {
        return this.pregunta;
    }

    public List<String> obtenerRespuestas() {
        return this.respuestas;
    }

    public String obtenerRespuestaCorrecta() {
        return this.respuestaCorrecta;
    }

    public boolean esRespuestaCorrecta(String respuesta) {
        return this.respuestaCorrecta.equals(respuesta);
    }

}
