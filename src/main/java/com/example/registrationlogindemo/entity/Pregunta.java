package com.example.registrationlogindemo.entity;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Pregunta {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    public Pregunta() {
        // constructor sin argumentos
    }

    // getters y setters...
}
