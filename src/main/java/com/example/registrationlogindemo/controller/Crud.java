package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.Pelicula;
import com.example.registrationlogindemo.service.ServicioPeliculas;
import com.example.registrationlogindemo.storage.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.method.annotation.MvcUriComponentsBuilder;

@Controller
public class Crud {
    @Autowired
    ServicioPeliculas servicioPeliculas;

    @Autowired
    StorageService storageService;

    @GetMapping("/crud")
    public String listadoPeliculas(Model model) {
        //El nombre de "peliculas" es el que voy a utilizar en la plantilla
        model.addAttribute("peliculas", servicioPeliculas.findAll());
        return "crud";
    }

    @GetMapping("/add")
    public String addPelicula(Model model) {
        model.addAttribute("formPelicula", new Pelicula());
        return "form_add";
    }

    @PostMapping("/crud/save")
    public String guardarPelicula(@ModelAttribute("formPelicula") Pelicula nuevaPelicula,
                                  @RequestParam("file") MultipartFile file) {

        if (!file.isEmpty()) {
            String imagen = storageService.store(file, nuevaPelicula.getTitulo());
            System.out.println("La imagen a guardar es : " + imagen);
            nuevaPelicula.setImagen(MvcUriComponentsBuilder
                    .fromMethodName(FileUploadController.class, "serveFile", imagen).build().toUriString());
        }

        servicioPeliculas.save(nuevaPelicula);
        return "redirect:/add";
    }

    @GetMapping("/crud/update/{id}")
    public String muestraPelicula(@PathVariable long id, Model model) {
        Pelicula p = servicioPeliculas.findById(id);
        model.addAttribute("formPelicula", p);
        return "form_add";
    }


    @PostMapping("/crud/modificar")
    public String modificarPelicula(@ModelAttribute("formPelicula") Pelicula p,
                                    @RequestParam("file") MultipartFile file) {

        if (!file.isEmpty()) {
            String imagen = storageService.store(file, p.getTitulo());
            System.out.println("La imagen a guardar es : " + imagen);
            p.setImagen(MvcUriComponentsBuilder
                    .fromMethodName(FileUploadController.class, "serveFile", imagen).build().toUriString());
        }

        servicioPeliculas.save(p);
        return "redirect:/crud";
    }

    @GetMapping("/crud/delete/{id}")
    public String borrarPelicula(@PathVariable("id") long id) {

        servicioPeliculas.deleteById(id);
        return "redirect:/crud";
    }


}
