package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.PoliJson;
import com.example.registrationlogindemo.service.PoliServicio;
import com.example.registrationlogindemo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import java.time.LocalDate;

@Controller
public class PoliController {
    @Autowired
    UserService userService;
    @Autowired
    PoliServicio poliServicio;

    @PostMapping("/guardarPoli")
    public String guardarPoli(@RequestBody String jsonPoli, Authentication authentication){
        PoliJson poliJson = new PoliJson();
        poliJson.setUser(userService.findByEmail(authentication.getName()));
        poliJson.setFecha(LocalDate.now());
        poliJson.setPoliJson(jsonPoli);
        poliServicio.save(poliJson);
        return "redirect:/principal";
    }

    @GetMapping("/poli")
    public String poli(){
        return "poli";
    }


}
