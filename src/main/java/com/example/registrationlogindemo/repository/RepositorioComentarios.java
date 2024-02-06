package com.example.registrationlogindemo.repository;

import com.example.registrationlogindemo.entity.Comentario;
import com.example.registrationlogindemo.entity.Pelicula;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface RepositorioComentarios extends JpaRepository<Comentario, Long> {
    public ArrayList<Comentario> findAll();

    public Comentario findById(long id);

    public ArrayList<Comentario> findByPelicula(Pelicula pelicula);

    public Comentario save(Comentario comentario);

    public Comentario deleteByPelicula(Pelicula pelicula);

    public void delete(Comentario comentario);

    public ArrayList<Comentario> findTop3ByOrderByIdDesc();
}
