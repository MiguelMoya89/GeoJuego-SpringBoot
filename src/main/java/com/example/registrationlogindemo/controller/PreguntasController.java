package com.example.registrationlogindemo.controller;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.HashMap;
import java.util.Map;
import java.lang.Math;

@Controller
public class PreguntasController {

    // Mapa de preguntas y respuestas correctas
    private Map<String, String[]> preguntasYRespuestas = new HashMap<>();

    @PostConstruct
    public void init() {
        // Agregar las preguntas y respuestas correctas al mapa
        preguntasYRespuestas.put("¿Cuál es la capital de España?", new String[]{"40.416775", "-3.703790"});
        preguntasYRespuestas.put("¿Cuál es la capital de Francia?", new String[]{"48.856614", "2.352222"});
    }

    // Método para obtener la respuesta correcta a una pregunta
    public String[] obtenerRespuestaCorrecta(String pregunta) {
        return preguntasYRespuestas.get(pregunta);
    }

    // Método para calcular la distancia entre dos puntos geográficos
    private double calcularDistancia(double lat1, double lon1, double lat2, double lon2) {
        int radioTierra = 6371; // radio de la Tierra en kilómetros
        double latDistancia = Math.toRadians(lat2 - lat1);
        double lonDistancia = Math.toRadians(lon2 - lon1);
        double a = Math.sin(latDistancia / 2) * Math.sin(latDistancia / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistancia / 2) * Math.sin(lonDistancia / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distancia = radioTierra * c;
        return distancia;
    }

    // Método para verificar si la respuesta del usuario está dentro del margen de error permitido
    public boolean verificarRespuesta(String pregunta, double latUsuario, double lonUsuario) {
        String[] respuestaCorrecta = preguntasYRespuestas.get(pregunta);
        double latCorrecta = Double.parseDouble(respuestaCorrecta[0]);
        double lonCorrecta = Double.parseDouble(respuestaCorrecta[1]);
        double distancia = calcularDistancia(latCorrecta, lonCorrecta, latUsuario, lonUsuario);
        return distancia <= 30; // margen de error de 30 km
    }

    @GetMapping("/preguntas")
    public String preguntas(Model model){
        // Agregar las preguntas y las respuestas al modelo para ser mostradas en la vista
        model.addAttribute("preguntas", preguntasYRespuestas);

        // Devolver el nombre de la vista que se debe mostrar (en este caso, "preguntas.html")
        return "preguntas";
    }
}