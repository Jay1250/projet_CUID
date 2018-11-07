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
import com.capgemini.referentielcuid.model.Contrat;
import com.capgemini.referentielcuid.service.ContratService;

@RestController
public class ContratController {

	@Autowired
	private ContratService contratService;
	
	@GetMapping(value = "/Contrat")
	public List<Contrat> findAll() {
		return contratService.findAll();
	}
	
	@GetMapping(value = "/Contrat/{id}")
	public Optional<Contrat> afficherUnContrat(@PathVariable int id){
		return contratService.findById(id);
	}
	
	@PostMapping(value = "/Contrat")
	public ResponseEntity<Contrat> addOne(@Valid @RequestBody Contrat contrat) {
		Contrat newContrat = null;
		try {
			newContrat = contratService.addOne(contrat);
		} catch(Exception e) {
			throw new ConflictException("Erreur lors du POST du contrat : " + contrat.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Contrat>(newContrat, HttpStatus.ACCEPTED);
	}
	
	@PutMapping(value = "/Contrat")
	public ResponseEntity<Contrat> updateContrat(@RequestBody Contrat contrat) {
		Contrat NewContrat = null;
		try {
			NewContrat = contratService.update(contrat);
		} catch (Exception e) {
			throw new NotFoundException("Erreur lors du PUT du contrat : " + contrat.getId() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Contrat>(NewContrat, HttpStatus.ACCEPTED);
	}
	
	@DeleteMapping(value = "/Contrat/{id}")
	public ResponseEntity<Boolean> supprimerContrat(@PathVariable int id) {
		if (!contratService.deleteById(id)) {
			throw new NotFoundException("Erreur lors du DELETE du contrat : " + id);
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
	}
}
