package com.example.registrationlogindemo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PrincipalController {

    @GetMapping("/principal")
    public String principal(Model model ){
        return "principal";
    }

    @GetMapping("/guardados")
    public String guardados(Model model ){
        return "guardados";
    }


}
