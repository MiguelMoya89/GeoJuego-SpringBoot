package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.Noticiero;
import com.example.registrationlogindemo.service.ServicioComentarios;
import com.example.registrationlogindemo.service.ServicioNoticieros;
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
    ServicioNoticieros servicioNoticieros;
    @Autowired
    ServicioComentarios servicioComentarios;

    @GetMapping("/noticias")
    public String noticias(Model model) {
        List<Noticiero> noticieros = servicioNoticieros.findAll();
        model.addAttribute("noticieros", noticieros);
        return "noticias";
    }


    @GetMapping("/noticiero/{id}")
    public String noticiero(@PathVariable long id, Model model) {
        Noticiero p = servicioNoticieros.findById(id);
        model.addAttribute("noticiero", p);
        model.addAttribute("comentarios", servicioComentarios.findByNoticiero(p));
        //model.addAttribute("nuevoComentario", new Comentario());
        return "noticiero";
    }

    //@PostMapping("/comentario/add")
    //public String guardarComentario(@ModelAttribute("nuevoComentario") Comentario comentario, @RequestParam long idNoticiero) {
    //    comentario.setFecha(LocalDate.now());
    //    comentario.setNoticiero(servicioNoticieros.findById(idNoticiero));
    //    servicioComentarios.save(comentario);
    //    return "redirect:/noticiero/" + comentario.getNoticiero().getId();
    //}


    // @GetMapping("/noticiero/{id}/comentario/{idComentario}/update")
    // public String mostrarComentario(@PathVariable long id, @PathVariable long idComentario, Model model) {
    //     Comentario c = servicioComentarios.findById(idComentario);
    //     model.addAttribute("comentario", c);
    //     return "form_comentario";
    // }

}
