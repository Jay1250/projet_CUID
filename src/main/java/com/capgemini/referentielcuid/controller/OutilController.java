package com.capgemini.referentielcuid.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.referentielcuid.exception.ConflictException;
import com.capgemini.referentielcuid.exception.NotFoundException;
import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.model.Outil;
import com.capgemini.referentielcuid.service.OutilService;

@RestController
@CrossOrigin("*")
public class OutilController {

	@Autowired
	private OutilService outilService;
	
	@GetMapping(value = "/Outil")
	public List<Outil> findAll() {
		return outilService.findAll();
	}
	
	@GetMapping(value = "/Outil/{id}")
	public Optional<Outil> afficherOutils(@PathVariable int id){
		return outilService.findById(id);
	}
	
	@PostMapping(value = "/Outil")
	public ResponseEntity<Outil> addOne(@Valid @RequestBody Outil outil) {
		Outil newOutil = null;
		try {
			newOutil = outilService.addOne(outil);
		} catch(Exception e) {
			throw new ConflictException("Erreur lors du POST de l'outil : " + outil.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Outil>(newOutil, HttpStatus.ACCEPTED);
	}
	
	@PutMapping(value = "/Outil")
	public ResponseEntity<Outil> updateOutil(@RequestBody Outil outil) {
		Outil newOutil = null;
		try {
			newOutil = outilService.update(outil);
		} catch (Exception e) {
			throw new NotFoundException("Erreur lors du PUT de l'outil : " + outil.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Outil>(newOutil, HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping(value = "/Outil/{id}")
	public ResponseEntity<Boolean> supprimerOutil(@PathVariable int id) {
		if (!outilService.deleteById(id)) {
			throw new NotFoundException("Erreur lors du DELETE de l'outil : " + id);
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
	}
}
