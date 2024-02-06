package com.example.registrationlogindemo.repository;

import com.example.registrationlogindemo.entity.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface RepositorioPeliculas extends JpaRepository<Pelicula, Long> {

    public ArrayList<Pelicula> findAll();

    public Pelicula findById(long id);

    public Pelicula findByTitulo(String titulo);

    public Pelicula save(Pelicula pelicula);

    public ArrayList<Pelicula> findByNacionalidad(String nacionalidad);
}
