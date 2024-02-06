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
    private String descripcion;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaSubida;

    private String nacionalidad;

    private String imagen;

    private String videoURL;

    @OneToMany(mappedBy = "pelicula", cascade = CascadeType.REMOVE)
    private List<Comentario> comentarios;

    @Override
    public String toString() {
        return "Pelicula {id=" + id + ", titulo=" + titulo + "si" + descripcion + ", fechaSubida=" + fechaSubida + ", nacionalidad=" + nacionalidad + ", imagen=" + imagen + ", videoURL=" + videoURL + /* other fields */"}";
    }

    public void setVideoURL(String videoURL) {
        this.videoURL = videoURL;
    }
}

