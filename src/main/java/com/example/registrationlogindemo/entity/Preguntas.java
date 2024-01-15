package com.example.registrationlogindemo.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Preguntas {
    private Map<String, List<String>> preguntasYRespuestas;

    public Preguntas() {
        this.preguntasYRespuestas = new HashMap<>();
    }

    public void agregarPreguntaYRespuesta(String pregunta, List<String> respuestas) {
        this.preguntasYRespuestas.put(pregunta, respuestas);
    }

    public List<String> obtenerRespuesta(String pregunta) {
        return this.preguntasYRespuestas.get(pregunta);
    }

    public Map<String, List<String>> obtenerTodasLasPreguntasYRespuestas() {
        return this.preguntasYRespuestas;
    }
}