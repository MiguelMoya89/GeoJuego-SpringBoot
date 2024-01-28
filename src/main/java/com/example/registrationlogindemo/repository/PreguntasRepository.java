package com.example.registrationlogindemo.repository;

import com.example.registrationlogindemo.entity.Preguntas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PreguntasRepository extends JpaRepository<Preguntas, Long> {
}
