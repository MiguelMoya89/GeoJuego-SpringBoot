package com.example.registrationlogindemo.entity;

import lombok.Getter;

@Getter
public class Respuestas {
    // Getters and setters
    private String pregunta;
    private String respuestaSeleccionada;

    public void setPregunta(String pregunta) {
        this.pregunta = pregunta;
    }

    public void setRespuestaSeleccionada(String respuestaSeleccionada) {
        this.respuestaSeleccionada = respuestaSeleccionada;
    }
}