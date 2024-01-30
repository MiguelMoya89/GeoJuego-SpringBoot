package com.example.registrationlogindemo.repository;

import com.example.registrationlogindemo.entity.PoliJson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface PoliRepository extends JpaRepository<PoliJson, Long> {

    //public List<PoliJson> findAll();

    public PoliJson findById(long id);

    //public void save(PoliJson poliJson);

}
