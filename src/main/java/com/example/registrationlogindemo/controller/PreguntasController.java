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
        preguntas1.agregarPreguntaYRespuesta("¿Cuál es la capital de España?", respuestas1, "Madrid");
        listaPreguntas.add(preguntas1);

        // Crear el segundo objeto Preguntas y agregarlo a la lista
        Preguntas preguntas2 = new Preguntas();
        List<String> respuestas2 = new ArrayList<>();
        respuestas2.add("Paris");
        respuestas2.add("Lyon");
        respuestas2.add("Marsella");
        respuestas2.add("Toulouse");
        preguntas2.agregarPreguntaYRespuesta("¿Cuál es la capital de Francia?", respuestas2, "Paris");
        listaPreguntas.add(preguntas2);

        // Crear el tercer objeto Preguntas y agregarlo a la lista
        Preguntas preguntas3 = new Preguntas();
        List<String> respuestas3 = new ArrayList<>();
        respuestas3.add("Roma");
        respuestas3.add("Milán");
        respuestas3.add("Nápoles");
        respuestas3.add("Turín");
        preguntas3.agregarPreguntaYRespuesta("¿Cuál es la capital de Italia?", respuestas3, "Roma");
        listaPreguntas.add(preguntas3);

        // Crear el cuarto objeto Preguntas y agregarlo a la lista
        Preguntas preguntas4 = new Preguntas();
        List<String> respuestas4 = new ArrayList<>();
        respuestas4.add("Berlín");
        respuestas4.add("Hamburgo");
        respuestas4.add("Múnich");
        respuestas4.add("Colonia");
        preguntas4.agregarPreguntaYRespuesta("¿Cuál es la capital de Alemania?", respuestas4, "Berlín");
        listaPreguntas.add(preguntas4);

        // Crear el quinto objeto Preguntas y agregarlo a la lista
        Preguntas preguntas5 = new Preguntas();
        List<String> respuestas5 = new ArrayList<>();
        respuestas5.add("Lisboa");
        respuestas5.add("Oporto");
        respuestas5.add("Vila Nova de Gaia");
        respuestas5.add("Amadora");
        preguntas5.agregarPreguntaYRespuesta("¿Cuál es la capital de Portugal?", respuestas5, "Lisboa");
        listaPreguntas.add(preguntas5);

        // Generar un número aleatorio entre 0 y el tamaño de la lista de preguntas (exclusivo)
        Random rand = new Random();
        int indiceAleatorio = rand.nextInt(listaPreguntas.size());

        // Seleccionar una pregunta aleatoria de la lista
        Preguntas preguntasAleatorias = listaPreguntas.get(indiceAleatorio);

        // Agregar la pregunta, las respuestas y la respuesta correcta al modelo para ser mostradas en la vista
        model.addAttribute("pregunta", preguntasAleatorias.obtenerPregunta());
        model.addAttribute("respuestas", preguntasAleatorias.obtenerRespuestas());
        model.addAttribute("respuestaCorrecta", preguntasAleatorias.obtenerRespuestaCorrecta());

        // Devolver el nombre de la vista que se debe mostrar (en este caso, "preguntas.html")
        return "preguntas";
    }
}