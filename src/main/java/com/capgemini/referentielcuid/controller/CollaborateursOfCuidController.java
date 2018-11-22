package com.capgemini.referentielcuid.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.referentielcuid.model.CollaborateursOfCuid;
import com.capgemini.referentielcuid.repository.CollaborateursOfCuidRepository;

@RestController
@CrossOrigin("*")
public class CollaborateursOfCuidController {

	@Autowired
	private CollaborateursOfCuidRepository collaborateursCuidRepository;
	
	@GetMapping(value = "/CollaborateursCuid")
	public Iterable<CollaborateursOfCuid> listeCollaborateursCUid(){
		Iterable<CollaborateursOfCuid> collaborateursCuid = collaborateursCuidRepository.findAll();
		return collaborateursCuid;
	}
	
	// ne fonctionne pas
	@GetMapping(value = "/CollaborateursCuid/{cuid}")
	public Optional<CollaborateursOfCuid> afficherCollaborateursCuid(@PathVariable String cuid) {
		return collaborateursCuidRepository.findById(cuid);
	}
	
	@GetMapping(value = "/CollaborateursCuidEnCours/{cuid}")
	public Iterable<CollaborateursOfCuid> afficherCollaborateursCuidEnCours(@PathVariable String cuid) {
		return collaborateursCuidRepository.findByCuidAndDateliberationIsNull(cuid);
	}
	
	@GetMapping(value = "/CollaborateursCuidTermine/{cuid}")
	public Iterable<CollaborateursOfCuid> afficherCollaborateursCuidTermine(@PathVariable String cuid) {
		return collaborateursCuidRepository.findByCuidAndDateliberationIsNotNull(cuid);
	}
}
