package com.capgemini.referentielcuid.trash;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.referentielcuid.model.CuidCollaborateursId;

@RestController
@CrossOrigin("*")
public class CollaborateursOfCuidController {

	@Autowired
	private CollaborateursOfCuidRepository collaborateursCuidRepository;
	
	@GetMapping(value = "/CollaborateursCuid")
	public List<CollaborateursOfCuid> listeCollaborateursCUid(){
		List<CollaborateursOfCuid> collaborateursCuid = collaborateursCuidRepository.findAll();
		return collaborateursCuid;
	}
	
	// ne fonctionne pas
	@GetMapping(value = "/CollaborateursCuid/{cuid}")
	public List<CollaborateursOfCuid> afficherCollaborateursCuid(@PathVariable String cuid) {
		return collaborateursCuidRepository.findByCuidcollaborateurCuid(cuid);
	}
	/*
	@GetMapping(value = "/CollaborateursCuidEnCours/{cuid}")
	public Iterable<CollaborateursOfCuid> afficherCollaborateursCuidEnCours(@PathVariable String cuid) {
		return collaborateursCuidRepository.findByCuidAndDateliberationIsNull(cuid);
	}
	
	@GetMapping(value = "/CollaborateursCuidTermine/{cuid}")
	public Iterable<CollaborateursOfCuid> afficherCollaborateursCuidTermine(@PathVariable String cuid) {
		return collaborateursCuidRepository.findByCuidAndDateliberationIsNotNull(cuid);
	}
	*/
}
