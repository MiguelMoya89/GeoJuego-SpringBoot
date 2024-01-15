package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.Preguntas;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;

@Controller
public class PreguntasController {

    @GetMapping("/preguntas")
    public String preguntas(Model model){
        Preguntas preguntas = new Preguntas();
        List<String> respuestas = new ArrayList<>();
        respuestas.add("Respuesta 1");
        respuestas.add("Respuesta 2");
        respuestas.add("Respuesta 3");
        respuestas.add("Respuesta 4");
        preguntas.agregarPreguntaYRespuesta("¿Cuál es la capital de España?", respuestas);
        model.addAttribute("preguntas", preguntas.obtenerTodasLasPreguntasYRespuestas());
        return "preguntas";
    }
}
