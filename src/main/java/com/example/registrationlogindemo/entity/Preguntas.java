package com.example.registrationlogindemo.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ElementCollection;
import javax.persistence.CollectionTable;
import javax.persistence.Column;
import java.util.List;
import javax.persistence.*;

@Setter
@Getter
@Entity
public class Preguntas {
    // setters
    // getters
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String pregunta;
    @ElementCollection
    @CollectionTable(name = "respuestas")
    @Column(name = "respuesta")
    private List<String> respuestas;
    private String respuestaCorrecta;

}