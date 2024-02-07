package com.example.registrationlogindemo.service;



import com.example.registrationlogindemo.entity.Noticiero;
import com.example.registrationlogindemo.repository.RepositorioNoticieros;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class ServicioNoticieros {
    @Autowired
    RepositorioNoticieros repo;

    public ArrayList<Noticiero> findAll() {
        return repo.findAll();
    }

    public Noticiero findById(long id) {
        return repo.findById(id);
    }

    public Noticiero save(Noticiero noticiero) {
        return repo.save(noticiero);
    }

    public ArrayList<Noticiero> findByNacionalidad(String nacionalidad) {return repo.findByNacionalidad(nacionalidad);
    }

    public void deleteById(long id) {
        repo.deleteById(id);
    }
}
