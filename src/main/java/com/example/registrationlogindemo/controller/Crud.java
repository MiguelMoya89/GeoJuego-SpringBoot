package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.Noticiero;
import com.example.registrationlogindemo.service.ServicioNoticieros;
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
    ServicioNoticieros servicioNoticieros;

    @Autowired
    StorageService storageService;

    @GetMapping("/crud")
    public String listadoNoticieros(Model model) {
        //El nombre de "noticiero" es el que voy a utilizar en la plantilla
        model.addAttribute("noticieros", servicioNoticieros.findAll());
        return "crud";
    }

    @GetMapping("/add")
    public String addNoticiero(Model model) {
        model.addAttribute("formNoticiero", new Noticiero());
        return "form_add";
    }

    @PostMapping("/crud/save")
    public String guardarNoticiero(@ModelAttribute("formNoticiero") Noticiero nuevaNoticiero,
                                  @RequestParam("file") MultipartFile file,
                                  @RequestParam(value = "videoURL", required = false) String videoURL) {

        if (!file.isEmpty()) {
            String imagen = storageService.store(file, nuevaNoticiero.getTitulo());
            System.out.println("La imagen a guardar es : " + imagen);
            nuevaNoticiero.setImagen(MvcUriComponentsBuilder
                    .fromMethodName(FileUploadController.class, "serveFile", imagen).build().toUriString());
        }

        if (videoURL == null || videoURL.isEmpty()) {
            nuevaNoticiero.setVideoURL(null);
        } else {
            nuevaNoticiero.setVideoURL(videoURL);
        }

        servicioNoticieros.save(nuevaNoticiero);
        return "redirect:/add";
    }

    @GetMapping("/crud/update/{id}")
    public String muestraNoticiero(@PathVariable long id, Model model) {
        Noticiero p = servicioNoticieros.findById(id);
        model.addAttribute("formNoticiero", p);
        return "form_add";
    }


    @PostMapping("/crud/modificar")
    public String modificarNoticiero(@ModelAttribute("formNoticiero") Noticiero p,
                                    @RequestParam("file") MultipartFile file) {

        if (!file.isEmpty()) {
            String imagen = storageService.store(file, p.getTitulo());
            System.out.println("La imagen a guardar es : " + imagen);
            p.setImagen(MvcUriComponentsBuilder
                    .fromMethodName(FileUploadController.class, "serveFile", imagen).build().toUriString());
        }

        servicioNoticieros.save(p);
        return "redirect:/crud";
    }

    @GetMapping("/crud/delete/{id}")
    public String borrarNoticiero(@PathVariable("id") long id) {

        servicioNoticieros.deleteById(id);
        return "redirect:/crud";
    }


}
