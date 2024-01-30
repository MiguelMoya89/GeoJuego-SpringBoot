package com.example.registrationlogindemo.service;

import com.example.registrationlogindemo.entity.PoliJson;
import com.example.registrationlogindemo.repository.PoliRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PoliServicio {
    @Autowired
    PoliRepository poliRepository;

    public List<PoliJson> findAll() {
        return poliRepository.findAll();
    }

    public PoliJson findById(long id) {
        return poliRepository.findById(id);
    }

    public void save(PoliJson poliJson) {
        poliRepository.save(poliJson);
    }
}
