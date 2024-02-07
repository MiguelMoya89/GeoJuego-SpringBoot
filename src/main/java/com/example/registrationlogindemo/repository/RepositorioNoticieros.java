package com.example.registrationlogindemo.repository;

import com.example.registrationlogindemo.entity.Noticiero;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface RepositorioNoticieros extends JpaRepository<Noticiero, Long> {

    public ArrayList<Noticiero> findAll();

    public Noticiero findById(long id);

    public Noticiero findByTitulo(String titulo);

    public Noticiero save(Noticiero noticiero);

    public ArrayList<Noticiero> findByNacionalidad(String nacionalidad);
}
