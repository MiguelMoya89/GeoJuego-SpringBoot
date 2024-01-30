package com.example.registrationlogindemo.entity;

import lombok.Data;

import jakarta.persistence.*;
import java.time.LocalDate;

@Data
@Entity
public class PoliJson {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne
    //@JoinColumn(name = "id")
    private User user;

    private LocalDate fecha;

    @Column( columnDefinition = "TEXT")
    private String poliJson;

}
