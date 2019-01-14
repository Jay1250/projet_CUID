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
import com.capgemini.referentielcuid.model.Application;
import com.capgemini.referentielcuid.service.ApplicationService;
import com.capgemini.referentielcuid.service.ServiceException;

@RestController
@CrossOrigin("*")
public class ApplicationController {

	@Autowired
	private ApplicationService applicationService;
	
	@GetMapping(value = "/Application")
	public List<Application> findAll() throws ServiceException {
		List<Application> app = null;
		try {
			app  = applicationService.findAll();
			if (app.isEmpty()) throw new NotFoundException("Aucune application n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return app;
	}
	
	@GetMapping(value = "/Application/{id}")
	public Optional<Application> afficherUneApplication(@PathVariable int id) throws ServiceException{
		Optional<Application> app = null;
		try {
			app = applicationService.findById(id);
			if (!app.isPresent()) throw new NotFoundException("L'application " + id + " est introuvable");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return app;
	}
	
	@PostMapping(value = "/Application")
	public ResponseEntity<Application> addOne(@Valid @RequestBody Application application) throws ServiceException {
		Application newApp = null;
		try {
			newApp = applicationService.addOne(application);
		} catch(ServiceException e) {
			throw new ConflictException("Erreur lors du POST de l'application : " + application.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Application>(newApp, HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/Application")
	public ResponseEntity<Application> updateApplication(@RequestBody Application application) throws ServiceException {
		Application NewApp = null;
		try {
			NewApp = applicationService.update(application);
		} catch (ServiceException e) {
			throw new NotFoundException("Erreur lors du PUT de l'application : " + application.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Application>(NewApp, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/Application/{id}")
	public ResponseEntity<Boolean> supprimerApplication(@PathVariable Application application) throws ServiceException {
		if (!applicationService.deleteById(application)) {
			throw new NotFoundException("Erreur lors du DELETE de l'application : " + application);
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
}
