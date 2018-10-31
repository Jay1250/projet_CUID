package com.capgemini.referentielcuid.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJacksonValue;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.repository.CollaborateursRepository;



@RestController
public class CollaborateurController {

	@Autowired
	private CollaborateursRepository collaborateurRepository;
	
	@GetMapping(value = "/Collaborateurs")
	public Iterable<Collaborateurs> listeCollaborateurs(){
		
		Iterable<Collaborateurs> collaborateurs = collaborateurRepository.findAll();
		
		return collaborateurs;
	}
	
	@GetMapping(value = "/Collaborateurs/{trigrame}")
	public Optional<Collaborateurs> afficherUnCollaborateur(@PathVariable String trigrame) {
		
		return collaborateurRepository.findById(trigrame);
	}
	
	@PutMapping(value = "/Collaborateurs")
	public void updateProduits(@RequestBody Collaborateurs collaborateurs) {
		
		collaborateurRepository.save(collaborateurs);
	}
	
	@PostMapping(value = "/Collaborateurs")
	public ResponseEntity<Void> ajouterProduit(@RequestBody Collaborateurs collaborateurs) {
		
		Collaborateurs productAdded = collaborateurRepository.save(collaborateurs);
		
		if(productAdded == null)
			return ResponseEntity.noContent().build();
		
		URI location = ServletUriComponentsBuilder
				.fromCurrentRequest()
				.path("/{trigrame}")
				.buildAndExpand(productAdded.getTrigrame())
				.toUri();
		
		return ResponseEntity.created(location).build();
	}
	/*
	@PostMapping
	public ResponseEntity<Collaborateurs> addOne(@RequestBody Collaborateurs collaborateur) {
		System.out.println(collaborateur);
		Collaborateurs newCollab = null;
		try {
			
			Optional<Collaborateurs> old = collaborateurRepository.findById(collaborateur.getTrigrame());
			if(old.isPresent())
				throw new Exception("Trigramme déjà existant");
			
			newCollab = collaborateurRepository.save(collaborateur);
		} catch(Exception e) {
			return new ResponseEntity<Collaborateurs>(HttpStatus.CONFLICT);
		}
		return new ResponseEntity<Collaborateurs>(newCollab, HttpStatus.ACCEPTED);
	}
	*/
	@DeleteMapping(value = "/Collaborateurs/{id}")
	public void supprimerProduit(@PathVariable String trigram) {
		
		collaborateurRepository.deleteById(trigram);
	}
	

	
}
