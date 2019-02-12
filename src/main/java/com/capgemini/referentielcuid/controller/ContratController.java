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
import com.capgemini.referentielcuid.model.Contrat;
import com.capgemini.referentielcuid.service.ContratService;
import com.capgemini.referentielcuid.service.ServiceException;

@RestController
@CrossOrigin("*")
public class ContratController {

	@Autowired
	private ContratService contratService;
	
	@GetMapping(value = "/Contrat")
	public List<Contrat> findAll() throws ServiceException {
		List<Contrat> contrat = null;
		try {
			contrat = contratService.findAll();
			if (contrat.isEmpty()) throw new NotFoundException("Aucun contrat n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return contrat;
	}
	
	@GetMapping(value = "/Contrat/{id}")
	public Optional<Contrat> afficherUnContrat(@PathVariable int id) throws ServiceException{
		Optional<Contrat> contrat = null;
		try {
			contrat = contratService.findById(id);
			if (!contrat.isPresent()) throw new NotFoundException("Le contrat " + id + " est introuvable");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return contrat;
	}
	
	@GetMapping(value = "/ContratByName/{nom}")
	public Optional<Contrat> afficherUnContratWithName(@PathVariable String nom) throws ServiceException{
		Optional<Contrat> contrat = null;
		try {
			contrat = contratService.findByNom(nom);
			if (!contrat.isPresent()) throw new NotFoundException("Le contrat " + nom + " est introuvable");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return contrat;
	}
	
	@PostMapping(value = "/Contrat")
	public ResponseEntity<Contrat> addOne(@Valid @RequestBody Contrat contrat) throws ServiceException{
		Contrat newContrat = null;
		try {
			newContrat = contratService.addOne(contrat);
		} catch(Exception e) {
			throw new ConflictException("Erreur lors du POST du contrat : " + contrat.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Contrat>(newContrat, HttpStatus.CREATED);
	}
	
	@PutMapping(value = "/Contrat")
	public ResponseEntity<Contrat> updateContrat(@RequestBody Contrat contrat) throws ServiceException{
		Contrat NewContrat = null;
		try {
			NewContrat = contratService.update(contrat);
		} catch (Exception e) {
			throw new NotFoundException("Erreur lors du PUT du contrat : " + contrat.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Contrat>(NewContrat, HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/Contrat/{id}")
	public ResponseEntity<Boolean> supprimerContrat(@PathVariable int id) throws ServiceException {
		if (!contratService.deleteById(id)) {
			throw new NotFoundException("Erreur lors du DELETE du contrat : " + id);
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
}
