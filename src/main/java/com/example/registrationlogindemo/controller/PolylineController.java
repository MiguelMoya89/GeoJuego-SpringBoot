package com.example.registrationlogindemo.controller;

import com.example.registrationlogindemo.entity.Polyline;
import com.example.registrationlogindemo.repository.PolylineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/polylines")
public class PolylineController {

    @Autowired
    private PolylineRepository polylineRepository;

    public PolylineController(PolylineRepository polylineRepository) {
        this.polylineRepository = polylineRepository;
    }


    @GetMapping
    public ResponseEntity<List<Polyline>> getAllPolylines() {
        List<Polyline> polylines = polylineRepository.findAll();
        return new ResponseEntity<>(polylines, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Polyline> getPolylineById(@PathVariable Long id) {
        Optional<Polyline> polylineOptional = polylineRepository.findById(id);
        if (polylineOptional.isPresent()) {
            return new ResponseEntity<>(polylineOptional.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Polyline> updatePolyline(@PathVariable Long id, @RequestBody Polyline polyline) {
        Optional<Polyline> polylineOptional = polylineRepository.findById(id);
        if (polylineOptional.isPresent()) {
            Polyline polylineToUpdate = polylineOptional.get();
            polylineToUpdate.setLatlngs(polyline.getLatlngs());
            polylineToUpdate.setDescription(polyline.getDescription());
            Polyline updatedPolyline = polylineRepository.save(polylineToUpdate);
            return new ResponseEntity<>(updatedPolyline, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


}
