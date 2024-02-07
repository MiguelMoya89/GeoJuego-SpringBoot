package com.example.registrationlogindemo.service;



import com.example.registrationlogindemo.entity.Comentario;
import com.example.registrationlogindemo.entity.Noticiero;
import com.example.registrationlogindemo.repository.RepositorioComentarios;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ServicioComentarios {
    @Autowired
    RepositorioComentarios repo;

    public ArrayList<Comentario> findAll() {
        return repo.findAll();
    }

    public Comentario findById(long id) {
        return repo.findById(id);
    }

    public Comentario save(Comentario comentario) {
        return repo.save(comentario);
    }

    public ArrayList<Comentario> findByNoticiero (Noticiero noticiero) {
        return repo.findByNoticiero(noticiero);
    }

    public void delete(Comentario comentario) {
        repo.delete(comentario);
    }

    public void deleteByNoticiero(Noticiero noticiero) {
        repo.deleteByNoticiero(noticiero);
    }

    public ArrayList<Comentario> findTop3ByOrderByIdDesc() {
        return repo.findTop3ByOrderByIdDesc();
    }
}
