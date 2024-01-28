package com.example.registrationlogindemo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Polyline {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String latlngs;

    private String description;

    public Polyline() {
    }

    public Polyline(String latlngs, String description) {
        this.latlngs = latlngs;
        this.description = description;
    }

    public Polyline(Long id, String latlngs, String description) {
        this.id = id;
        this.latlngs = latlngs;
        this.description = description;
    }

    public String getLatlngs() {
        return latlngs;
    }

    public void setLatlngs(String latlngs) {
        this.latlngs = latlngs;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}