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
import com.capgemini.referentielcuid.model.CollaborateurInfos;
import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.service.CollaborateursService;
import com.capgemini.referentielcuid.service.ServiceException;



@RestController
@CrossOrigin("*")
public class CollaborateurController {

	@Autowired
	private CollaborateursService collaborateurService;
	
	@GetMapping(value = "/Collaborateur")
	public List<Collaborateurs> listeCollabs() throws ServiceException {
		List<Collaborateurs> collabs = null;
		try {
			collabs = collaborateurService.findAll();
			if (collabs.isEmpty()) throw new NotFoundException("Aucun collaborateur n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return collabs;
	}
	
	@GetMapping(value = "/Collaborateur/{trigrame}")
	public Optional<Collaborateurs> afficherUnCollaborateur(@PathVariable String trigrame) throws ServiceException{
		Optional<Collaborateurs> collabs = null;
		try {
			collabs = collaborateurService.findById(trigrame);
			if (!collabs.isPresent()) throw new NotFoundException("Le collaborateur " + trigrame + " est introuvable");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return collabs;
	}
	
	@GetMapping(value = "/TabCollaborateur")
	public List<CollaborateurInfos> afficherLeTabCollabs() throws ServiceException{
		List<CollaborateurInfos> collabs = null;
		try {
			collabs = collaborateurService.findAllCollaborateurInfos();
			if (collabs.isEmpty()) throw new NotFoundException("Aucun collaborateur n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return collabs;
	}
	
	@PostMapping(value = "/Collaborateur")
	public ResponseEntity<Collaborateurs> addOne(@Valid @RequestBody Collaborateurs collaborateur) throws ServiceException {
		Collaborateurs newCollab = null;
		try {
			newCollab = collaborateurService.addOne(collaborateur);
		} catch(ServiceException e) {
			throw new ConflictException("Erreur lors du POST du collaborateur : " + collaborateur.getTrigrame() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Collaborateurs>(newCollab, HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/Collaborateur")
	public ResponseEntity<Collaborateurs> updateCollaborateur(@RequestBody Collaborateurs collaborateur) throws ServiceException {
		Collaborateurs NewCollab = null;
		try {
			NewCollab = collaborateurService.update(collaborateur);
		} catch (ServiceException e) {
			throw new NotFoundException("Erreur lors du PUT du collaborateur : " + collaborateur.getTrigrame() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Collaborateurs>(NewCollab, HttpStatus.OK);
	}

	@DeleteMapping(value = "/Collaborateur/{trigrame}")
	public ResponseEntity<Boolean> supprimerCollaborateur(@PathVariable Collaborateurs collaborateur) throws ServiceException {
		if (!collaborateurService.deleteById(collaborateur)) {
			throw new NotFoundException("Erreur lors du DELETE du collaborateur : " + collaborateur);
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
}
