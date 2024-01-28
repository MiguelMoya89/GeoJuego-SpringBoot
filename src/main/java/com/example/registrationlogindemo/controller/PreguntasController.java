package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.Preguntas;
import com.example.registrationlogindemo.repository.PreguntasRepository;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Random;

@Controller
public class PreguntasController {

    private final PreguntasRepository preguntasRepository;

    public PreguntasController(PreguntasRepository preguntasRepository) {
        this.preguntasRepository = preguntasRepository;
    }

    @GetMapping("/preguntas")
    public String preguntas(Model model){
        List<Preguntas> listaPreguntas = preguntasRepository.findAll();

        Random rand = new Random();
        int indiceAleatorio = rand.nextInt(listaPreguntas.size());

        Preguntas preguntasAleatorias = listaPreguntas.get(indiceAleatorio);

        model.addAttribute("pregunta", preguntasAleatorias.getPregunta());
        model.addAttribute("respuestas", preguntasAleatorias.getRespuestas());
        model.addAttribute("respuestaCorrecta", preguntasAleatorias.getRespuestaCorrecta());

        return "preguntas";
    }
}