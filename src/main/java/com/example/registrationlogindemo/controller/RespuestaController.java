package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.Respuestas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.Arrays;

@Controller
public class RespuestaController {

    @Autowired
    private PreguntasController preguntasController;

    @PostMapping("/respuesta")
    public String procesarRespuesta(Respuestas respuesta, RedirectAttributes redirectAttributes) {
        String[] respuestaSeleccionada = respuesta.getRespuestaSeleccionada().split(",");

        // Obtener la respuesta correcta para la pregunta
        String[] respuestaCorrecta = preguntasController.obtenerRespuestaCorrecta(respuesta.getPregunta());

        // Verificar si la respuesta seleccionada es igual a la respuesta correcta
        boolean esCorrecta = Arrays.equals(respuestaSeleccionada, respuestaCorrecta);

        if (esCorrecta) {
            redirectAttributes.addFlashAttribute("mensaje", "¡Respuesta correcta!");
            redirectAttributes.addFlashAttribute("esCorrecta", true);
        } else {
            redirectAttributes.addFlashAttribute("mensaje", "Respuesta incorrecta.");
            redirectAttributes.addFlashAttribute("esCorrecta", false);
        }

        // Redirigir al usuario a la página de preguntas después de procesar su respuesta
        return "redirect:/preguntas";
    }
}