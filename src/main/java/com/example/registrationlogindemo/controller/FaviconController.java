package com.example.registrationlogindemo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;



//Este Controlador Elimina el ERROR GET http://localhost:9000/favicon.ico 404 (Not Found)
@RestController
public class FaviconController {
    @RequestMapping(value = "/favicon.ico", method = RequestMethod.GET)
    public ResponseEntity<Void> favicon() {
        return ResponseEntity.noContent().build();
    }
}