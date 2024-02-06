package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.Pelicula;
import com.example.registrationlogindemo.service.ServicioComentarios;
import com.example.registrationlogindemo.service.ServicioPeliculas;
import com.example.registrationlogindemo.storage.StorageProperties;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@EnableConfigurationProperties(StorageProperties.class)
public class Principal {

    @Autowired
    ServicioPeliculas servicioPeliculas;
    @Autowired
    ServicioComentarios servicioComentarios;

    @GetMapping("/noticias")
    public String noticias(Model model) {
        List<Pelicula> peliculas = servicioPeliculas.findAll();
        model.addAttribute("peliculas", peliculas);
        return "noticias";
    }


    @GetMapping("/pelicula/{id}")
    public String pelicula(@PathVariable long id, Model model) {
        Pelicula p = servicioPeliculas.findById(id);
        model.addAttribute("pelicula", p);
        model.addAttribute("comentarios", servicioComentarios.findByPelicula(p));
        //model.addAttribute("nuevoComentario", new Comentario());
        return "pelicula";
    }

    //@PostMapping("/comentario/add")
    //public String guardarComentario(@ModelAttribute("nuevoComentario") Comentario comentario, @RequestParam long idPelicula) {
    //    comentario.setFecha(LocalDate.now());
    //    comentario.setPelicula(servicioPeliculas.findById(idPelicula));
    //    servicioComentarios.save(comentario);
    //    return "redirect:/pelicula/" + comentario.getPelicula().getId();
    //}


    // @GetMapping("/pelicula/{id}/comentario/{idComentario}/update")
    // public String mostrarComentario(@PathVariable long id, @PathVariable long idComentario, Model model) {
    //     Comentario c = servicioComentarios.findById(idComentario);
    //     model.addAttribute("comentario", c);
    //     return "form_comentario";
    // }

}
