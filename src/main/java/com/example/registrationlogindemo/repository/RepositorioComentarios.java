package com.example.registrationlogindemo.repository;

import com.example.registrationlogindemo.entity.Comentario;
import com.example.registrationlogindemo.entity.Noticiero;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface RepositorioComentarios extends JpaRepository<Comentario, Long> {
    public ArrayList<Comentario> findAll();

    public Comentario findById(long id);

    public ArrayList<Comentario> findByNoticiero(Noticiero noticiero);

    public Comentario save(Comentario comentario);

    public Comentario deleteByNoticiero(Noticiero noticiero);

    public void delete(Comentario comentario);

    public ArrayList<Comentario> findTop3ByOrderByIdDesc();
}
