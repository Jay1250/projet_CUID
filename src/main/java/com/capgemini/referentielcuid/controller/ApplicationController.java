package com.capgemini.referentielcuid.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.referentielcuid.exception.ConflictException;
import com.capgemini.referentielcuid.exception.NotFoundException;
import com.capgemini.referentielcuid.model.Application;
import com.capgemini.referentielcuid.service.ApplicationService;

@RestController
public class ApplicationController {

	@Autowired
	private ApplicationService applicationService;
	
	@GetMapping(value = "/Application")
	public List<Application> findAll() {
		return applicationService.findAll();
	}
	
	@GetMapping(value = "/Application/{id}")
	public Optional<Application> afficherUneApplication(@PathVariable int id){
		return applicationService.findById(id);
	}
	
	@PostMapping(value = "/Application")
	public ResponseEntity<Application> addOne(@Valid @RequestBody Application application) {
		Application newApp = null;
		try {
			newApp = applicationService.addOne(application);
		} catch(Exception e) {
			throw new ConflictException("Erreur lors du POST de l'application : " + application.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Application>(newApp, HttpStatus.ACCEPTED);
	}
	
	@PutMapping(value = "/Application")
	public ResponseEntity<Application> updateApplication(@RequestBody Application application) {
		Application NewApp = null;
		try {
			NewApp = applicationService.update(application);
		} catch (Exception e) {
			throw new NotFoundException("Erreur lors du PUT de l'application : " + application.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Application>(NewApp, HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping(value = "/Application/{id}")
	public ResponseEntity<Boolean> supprimerApplication(@PathVariable int id) {
		if (!applicationService.deleteById(id)) {
			throw new NotFoundException("Erreur lors du DELETE de l'application : " + id);
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
	}
}
