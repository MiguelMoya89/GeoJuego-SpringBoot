package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.Respuestas;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.HashMap;
import java.util.Map;

@Controller
public class RespuestaController {

    @PostMapping("/respuesta")
    public String procesarRespuesta(Respuestas respuesta, RedirectAttributes redirectAttributes) {
        String respuestaSeleccionada = respuesta.getRespuestaSeleccionada();

        // Lógica para verificar la respuesta
        boolean esCorrecta = verificarRespuesta(respuestaSeleccionada);

        if (esCorrecta) {
            // Si la respuesta es correcta, agregar un atributo flash
            redirectAttributes.addFlashAttribute("mensaje", "¡Respuesta correcta!");
        }

        // Redirigir al usuario a la página de preguntas después de procesar su respuesta
        return "redirect:/preguntas";
    }

    // Mapa de preguntas y respuestas correctas
    private Map<String, String> preguntasYRespuestas = new HashMap<>();

    // Método para verificar la respuesta
    private boolean verificarRespuesta(String pregunta) {
        // Obtener la respuesta correcta para la pregunta
        String respuestaCorrecta = preguntasYRespuestas.get(pregunta);

        // Verificar si la respuesta seleccionada es igual a la respuesta correcta
        String respuestaSeleccionada = null;
        return respuestaSeleccionada.equals(respuestaCorrecta);
    }
}
