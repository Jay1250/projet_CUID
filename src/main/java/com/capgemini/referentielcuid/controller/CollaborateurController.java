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
import com.capgemini.referentielcuid.service.CollaborateursService;
import com.capgemini.referentielcuid.service.ServiceException;



@RestController
@CrossOrigin("*")
public class CollaborateurController {

	@Autowired
	private CollaborateursService collaborateurService;
	
	@GetMapping(value = "/Collaborateurs")
	public List<Collaborateurs> findAll() throws ServiceException {
		try {
			return collaborateurService.findAll();
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
	}
	
	@GetMapping(value = "/Collaborateurs/{trigrame}")
	public Optional<Collaborateurs> afficherUnCollaborateur(@PathVariable String trigrame) throws ServiceException{
		return collaborateurService.findById(trigrame);
	}
	
	@PostMapping(value = "/Collaborateurs")
	public ResponseEntity<Collaborateurs> addOne(@Valid @RequestBody Collaborateurs collaborateur) {
		Collaborateurs newCollab = null;
		try {
			newCollab = collaborateurService.addOne(collaborateur);
		} catch(Exception e) {

			throw new ConflictException("Erreur lors du POST du collaborateur : " + collaborateur.getTrigrame() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Collaborateurs>(newCollab, HttpStatus.ACCEPTED);
	}
	
	@PutMapping(value = "/Collaborateurs")
	public ResponseEntity<Collaborateurs> updateCollaborateur(@RequestBody Collaborateurs collaborateur) {
		Collaborateurs NewCollab = null;
		try {
			NewCollab = collaborateurService.update(collaborateur);
		} catch (Exception e) {
			throw new NotFoundException("Erreur lors du PUT du collaborateur : " + collaborateur.getTrigrame() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Collaborateurs>(NewCollab, HttpStatus.ACCEPTED);
	}

	@DeleteMapping(value = "/Collaborateurs/{trigrame}")
	public ResponseEntity<Boolean> supprimerCollaborateur(@PathVariable String trigrame) throws ServiceException {
		if (!collaborateurService.deleteById(trigrame)) {
			throw new NotFoundException("Erreur lors du DELETE du collaborateur : " + trigrame);
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
	}
}
