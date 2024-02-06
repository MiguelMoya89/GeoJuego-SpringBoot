package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.PoliJson;
import com.example.registrationlogindemo.service.PoliServicio;
import com.example.registrationlogindemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;


@CrossOrigin(origins = "*")
@RestController
public class PoliController {
    @Autowired
    UserService userService;
    @Autowired
    PoliServicio poliServicio;

    @PostMapping("/guardarPoly")
    public String guardarPoly(@RequestBody String jsonPoli, Authentication authentication){
        System.out.println("lLEGA A GUARDAR POLY");
        PoliJson poliJson = new PoliJson();
        poliJson.setUser(userService.findByEmail(authentication.getName()));
        poliJson.setFecha(LocalDate.now());
        poliJson.setPoliJson(jsonPoli);
        poliServicio.save(poliJson);
        return "redirect:/principal";
    }


}
