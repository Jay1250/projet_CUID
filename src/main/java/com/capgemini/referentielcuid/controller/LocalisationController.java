package com.capgemini.referentielcuid.controller;

import java.util.List;
import java.util.Optional;

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
import com.capgemini.referentielcuid.model.Localisation;
import com.capgemini.referentielcuid.service.LocalisationService;
import com.capgemini.referentielcuid.service.ServiceException;

@RestController
@CrossOrigin("*")
public class LocalisationController {

	@Autowired
	private LocalisationService localisationService;
	
	@GetMapping(value = "/Localisation")
	public List<Localisation> listeLocalisation() throws ServiceException{
		List<Localisation> localisation = null;	
		try {
			localisation = localisationService.findAll();
			if (localisation.isEmpty()) throw new NotFoundException("Aucune localisation n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return localisation;
	}
	
	@GetMapping(value = "/Localisation/{id}")
	public Optional<Localisation> afficherUneLocalisation(@PathVariable int id) throws ServiceException {
		Optional<Localisation> localisation = null;	
		try {
			localisation = localisationService.findById(id);
			if(!localisation.isPresent()) throw new NotFoundException("La localisation " + id + " est introuvable");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return localisation;
	}
	
	@PostMapping(value = "/Localisation")
	public ResponseEntity<Localisation> ajouterUneLocalisation(@RequestBody Localisation localisation) throws ServiceException {
		Localisation newLocal = null;
		try {
			newLocal = localisationService.addOne(localisation);
		} catch (ServiceException e) {
			throw new ConflictException("Erreur lors du POST de la localisation : " + localisation.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Localisation>(newLocal, HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/Localisation")
	public ResponseEntity<Localisation> updateLocalisation(@RequestBody Localisation localisation) throws ServiceException {
		Localisation newLocal = null;
		try {
			newLocal = localisationService.update(localisation);
		} catch (ServiceException e) {
			throw new NotFoundException("Erreur lors du PUT de la localisation: " + localisation.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Localisation>(newLocal, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/Localisation/{id}")
	public ResponseEntity<Boolean> supprimerLocalisation(@PathVariable Localisation localisation) throws ServiceException {
		if (!localisationService.deleteById(localisation)) {
			throw new NotFoundException("Erreur lors du DELETE de l'application : " + localisation);
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
}
