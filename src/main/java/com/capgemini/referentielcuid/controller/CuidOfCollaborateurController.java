package com.capgemini.referentielcuid.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.model.CuidOfCollaborateur;
import com.capgemini.referentielcuid.repository.CuidOfCollaborateurRepository;

@RestController
public class CuidOfCollaborateurController {

	@Autowired
	private CuidOfCollaborateurRepository cuidCollaborateurRepository;
	
	@GetMapping(value = "/CuidsCollaborateur")
	public Iterable<CuidOfCollaborateur> listeCuidsCollaborateurs(){
		Iterable<CuidOfCollaborateur> cuidsCollaborateur = cuidCollaborateurRepository.findAll();
		return cuidsCollaborateur;
	}
	
	@GetMapping(value = "/CuidsCollaborateur/{trigrame}")
	public Optional<CuidOfCollaborateur> afficherCuidsCollaborateur(@PathVariable String trigrame) {
		return cuidCollaborateurRepository.findById(trigrame);
	}
	
	@GetMapping(value = "/CuidsCollaborateurEnCours/{trigrame}")
	public CuidOfCollaborateur afficherCuidsCollaborateurEnCours(@PathVariable String trigrame) {	
		return cuidCollaborateurRepository.findByTrigrameAndDateliberationIsNull(trigrame);
	}
	
	@GetMapping(value = "/CuidsCollaborateurTermine/{trigrame}")
	public CuidOfCollaborateur afficherCuidsCollaborateurTermine(@PathVariable String trigrame) {	
		return cuidCollaborateurRepository.findByTrigrameAndDateliberationIsNotNull(trigrame);
	}
}
