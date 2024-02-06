package com.example.registrationlogindemo.entity;


import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "peliculas")
public class Pelicula {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String titulo;

    @Column(columnDefinition = "TEXT")
    private String sinopsis;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaEstreno;

    private String nacionalidad;

    private String imagen;

    private String trailer;

    @OneToMany(mappedBy = "pelicula", cascade = CascadeType.REMOVE)
    private List<Comentario> comentarios;

    @Override
    public String toString() {
        return "Pelicula {id=" + id + ", titulo=" + titulo + "si" + sinopsis + ", fechaEstreno=" + fechaEstreno + ", nacionalidad=" + nacionalidad + ", imagen=" + imagen + ", trailer=" + trailer + /* other fields */"}";
    }

}

