package com.capgemini.referentielcuid.controller;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.capgemini.referentielcuid.model.CollaborateurInfos;
import com.capgemini.referentielcuid.repository.CollaborateurInfosRepository;

@RestController
@CrossOrigin("*")
public class CollaborateurInfoController {

	@Autowired
	private CollaborateurInfosRepository collaborateurInfosRepository;
	
	@GetMapping(value = "/CollaborateurInfos")
	public Iterable<CollaborateurInfos> listeCollaborateurs(){
		
		Iterable<CollaborateurInfos> collaborateurInfos = collaborateurInfosRepository.findAll();
		
		return collaborateurInfos;
	}
	
	@GetMapping(value = "/CollaborateurInfos/{trigrame}")
	public Optional<CollaborateurInfos> afficherUnCollaborateurInfo(@PathVariable String trigrame) {
		
		return collaborateurInfosRepository.findById(trigrame);
	}
}
