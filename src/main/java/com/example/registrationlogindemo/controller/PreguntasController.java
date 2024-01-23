package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.Preguntas;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Controller
public class PreguntasController {

    @GetMapping("/preguntas")
    public String preguntas(Model model){
        // Crear una lista de objetos Preguntas
        List<Preguntas> listaPreguntas = new ArrayList<>();

        // Crear el primer objeto Preguntas y agregarlo a la lista
        Preguntas preguntas1 = new Preguntas();
        List<String> respuestas1 = new ArrayList<>();
        respuestas1.add("Madrid");
        respuestas1.add("Barcelona");
        respuestas1.add("Valencia");
        respuestas1.add("Sevilla");
        preguntas1.agregarPreguntaYRespuesta("¿Cuál es la capital de España?", respuestas1);
        listaPreguntas.add(preguntas1);

        // Crear el segundo objeto Preguntas y agregarlo a la lista
        Preguntas preguntas2 = new Preguntas();
        List<String> respuestas2 = new ArrayList<>();
        respuestas2.add("Paris");
        respuestas2.add("Lyon");
        respuestas2.add("Marsella");
        respuestas2.add("Toulouse");
        preguntas2.agregarPreguntaYRespuesta("¿Cuál es la capital de Francia?", respuestas2);
        listaPreguntas.add(preguntas2);

        // Generar un número aleatorio entre 0 y el tamaño de la lista de preguntas (exclusivo)
        Random rand = new Random();
        int indiceAleatorio = rand.nextInt(listaPreguntas.size());

        // Seleccionar una pregunta aleatoria de la lista
        Preguntas preguntasAleatorias = listaPreguntas.get(indiceAleatorio);

        // Agregar la pregunta y las respuestas al modelo para ser mostradas en la vista
        model.addAttribute("preguntas", preguntasAleatorias.obtenerTodasLasPreguntasYRespuestas());

        // Devolver el nombre de la vista que se debe mostrar (en este caso, "preguntas.html")
        return "preguntas";
    }
}