package com.example.registrationlogindemo.service;



import com.example.registrationlogindemo.entity.Pelicula;
import com.example.registrationlogindemo.repository.RepositorioPeliculas;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ServicioPeliculas {
    @Autowired
    RepositorioPeliculas repo;

    public ArrayList<Pelicula> findAll() {
        return repo.findAll();
    }

    public Pelicula findById(long id) {
        return repo.findById(id);
    }

    public Pelicula save(Pelicula pelicula) {
        return repo.save(pelicula);
    }

    public ArrayList<Pelicula> findByNacionalidad(String nacionalidad) {
        return repo.findByNacionalidad(nacionalidad);
    }

    public void deleteById(long id) {
        repo.deleteById(id);
    }
}
