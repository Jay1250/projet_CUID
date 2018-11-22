package com.capgemini.referentielcuid.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.capgemini.referentielcuid.model.Localisation;
import com.capgemini.referentielcuid.repository.LocalisationRepository;

@RestController
@CrossOrigin("*")
public class LocalisationController {

	@Autowired
	private LocalisationRepository localisationRepository;
	
	@GetMapping(value = "/Localisation")
	public Iterable<Localisation> listePays(){
		
		Iterable<Localisation> localisation = localisationRepository.findAll();
		
		return localisation;
	}
	
	@GetMapping(value = "/Localisation/{id}")
	public Optional<Localisation> afficherUnPays(@PathVariable int id) {
		
		return localisationRepository.findById(id);
	}
	
	@PostMapping(value = "/Localisation")
	public ResponseEntity<Void> ajouterProduit(@RequestBody Localisation localisation) {

		Localisation productAdded =  localisationRepository.save(localisation);

		if (productAdded == null)
			return ResponseEntity.noContent().build();

		URI location = ServletUriComponentsBuilder
			.fromCurrentRequest()
			.path("/{id}")
			.buildAndExpand(productAdded.getId())
			.toUri();

		return ResponseEntity.created(location).build();
	}
	
	@DeleteMapping(value = "/Localisation/{id}")
	public void supprimerProduit(@PathVariable int id) {
		
		localisationRepository.deleteById(id);
	}
}
