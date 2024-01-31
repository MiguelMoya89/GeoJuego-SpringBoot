package com.example.registrationlogindemo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PreguntasController {

    @GetMapping("/preguntas")
    public String preguntas(Model model) {
        return "preguntas";
    }
}

