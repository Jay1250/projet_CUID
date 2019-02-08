package com.capgemini.referentielcuid.controller;

import java.util.List;

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
import com.capgemini.referentielcuid.model.Affectation;
import com.capgemini.referentielcuid.model.CuidCollaborateurs;
import com.capgemini.referentielcuid.model.CuidCollaborateursId;
import com.capgemini.referentielcuid.service.CuidCollaborateursService;
import com.capgemini.referentielcuid.service.ServiceException;

@RestController
@CrossOrigin("*")
public class CuidCollaborateursController {

	@Autowired
	private CuidCollaborateursService cuidCollaborateurService;
	
	@GetMapping(value = "/CuidCollaborateur")
	public List<CuidCollaborateurs> findAll() throws ServiceException {
		List<CuidCollaborateurs> cuidapp = null;
		try {
			cuidapp  = cuidCollaborateurService.findAll();
			if (cuidapp.isEmpty()) throw new NotFoundException("Aucun cuidCollaborateur n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return cuidapp;
	}
	
	@GetMapping(value = "/CuidCollaborateur/collaborateur/{trigrame}")
	public List<CuidCollaborateurs> afficherUnCuidCollaborateurByCollab (@PathVariable String trigrame) throws ServiceException{
		List<CuidCollaborateurs> cuidCollab = null;
		try {
			cuidCollab = cuidCollaborateurService.findByCollaborateurs(trigrame);
			if (cuidCollab.isEmpty()) throw new NotFoundException("Le cuidCollaborateur " + trigrame + " est introuvable");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return cuidCollab;
	}
	
	@GetMapping(value = "/CuidCollaborateur/cuid/{id}")
	public List<CuidCollaborateurs> afficherUnCuidCollaborateurByCuid(@PathVariable String id) throws ServiceException{
		List<CuidCollaborateurs> cuidCollab = null;
		try {
			cuidCollab = cuidCollaborateurService.findByCuid(id);
			if (cuidCollab.isEmpty()) throw new NotFoundException("Le cuidCollaborateur " + id + " est introuvable");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return cuidCollab;
	}
	
	@GetMapping(value = "/TabAffectation")
	public List<Affectation> afficherTabAffectation() throws ServiceException{
		List<Affectation> affectations = null;
		try {
			affectations = cuidCollaborateurService.findAllAffectations();
			if (affectations.isEmpty()) throw new NotFoundException("Aucun cuidCollaborateur n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return affectations;
	}
	
	@GetMapping(value = "/TabAffectationEnCours")
	public List<Affectation> afficherTabAffectationEnCours() throws ServiceException{
		List<Affectation> affectations = null;
		try {
			affectations = cuidCollaborateurService.findAffectationsEnCours();
			if (affectations.isEmpty()) throw new NotFoundException("Aucun cuidCollaborateur n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return affectations;
	}
	
	@GetMapping(value = "/TabAffectationExpiree")
	public List<Affectation> afficherTabAffectationExpiree() throws ServiceException{
		List<Affectation> affectations = null;
		try {
			affectations = cuidCollaborateurService.findAffectationsExpirees();
			if (affectations.isEmpty()) throw new NotFoundException("Aucun cuidCollaborateur n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return affectations;
	}
	
	@GetMapping(value = "/TabAffectation/{id}")
	public List<Affectation> afficherTabAffectationById(@PathVariable String id) throws ServiceException{
		List<Affectation> affectations = null;
		try {
			affectations = cuidCollaborateurService.findAffectationsByCuid(id);
			if (affectations.isEmpty()) throw new NotFoundException("Aucun cuidCollaborateur n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return affectations;
	}
	
	@PostMapping(value = "/CuidCollaborateur")
	public ResponseEntity<CuidCollaborateurs> addApplication(@Valid @RequestBody CuidCollaborateurs cuidCollaborateurs) throws ServiceException {
		CuidCollaborateurs newApp = null;
		try {
			cuidCollaborateurs.setCuidcollaborateur(new CuidCollaborateursId(cuidCollaborateurs.getCuid().getCuid(), cuidCollaborateurs.getCollaborateurs().getTrigrame()));
			newApp = cuidCollaborateurService.addOne(cuidCollaborateurs);
		} catch(ServiceException e) {
			throw new ConflictException("Erreur lors du POST de l'application : " + cuidCollaborateurs.getCuidcollaborateur() + " -> " + e.getMessage());
		}
		return new ResponseEntity<CuidCollaborateurs>(newApp, HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/CuidCollaborateur")
	public ResponseEntity<CuidCollaborateurs> updateApplication(@RequestBody CuidCollaborateurs cuidCollaborateurs) throws ServiceException {
		CuidCollaborateurs NewApp = null;
		try {
			cuidCollaborateurs.setCuidcollaborateur(new CuidCollaborateursId(cuidCollaborateurs.getCuid().getCuid(), cuidCollaborateurs.getCollaborateurs().getTrigrame()));
			NewApp = cuidCollaborateurService.update(cuidCollaborateurs);
		} catch (ServiceException e) {
			throw new NotFoundException("Erreur lors du PUT de l'application : " + cuidCollaborateurs.getCuidcollaborateur() + " -> " + e.getMessage());
		}
		return new ResponseEntity<CuidCollaborateurs>(NewApp, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/CuidCollaborateur")
	public ResponseEntity<Boolean> supprimerApplication(@RequestBody CuidCollaborateurs cuidCollaborateurs) throws ServiceException {
		cuidCollaborateurs.setCuidcollaborateur(new CuidCollaborateursId(cuidCollaborateurs.getCuid().getCuid(), cuidCollaborateurs.getCollaborateurs().getTrigrame()));
		if (!cuidCollaborateurService.deleteById(cuidCollaborateurs)) {
			throw new NotFoundException("Erreur lors du DELETE de l'application : " + cuidCollaborateurs);
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
}
