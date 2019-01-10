package com.capgemini.referentielcuid.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.model.Cuid;
import com.capgemini.referentielcuid.model.CuidCollaborateurs;
import com.capgemini.referentielcuid.repository.CollaborateursRepository;
import com.capgemini.referentielcuid.repository.CuidCollaborateursRepository;

@RestController
@CrossOrigin("*")
public class CuidCollaborateursController {

	@Autowired
	private CuidCollaborateursRepository cuidCollaborateurRepository;
	
	@GetMapping(value = "/CuidCollaborateurs")
	public Iterable<CuidCollaborateurs> listeCuidCollaborateurs(){
		Iterable<CuidCollaborateurs> cuids = cuidCollaborateurRepository.findAll();
		return cuids;
	}
	/*
	@GetMapping(value = "/CuidCollaborateurs/Cuid/{cuid}")
	public Optional<CuidCollaborateurs> listeCuidCollaborateur(@PathVariable String cuid){
		
		Optional<CuidCollaborateurs> cuidCollaborateur = cuidCollaborateurRepository.findById(cuid);
		
		//System.out.println(cuidCollaborateur.get);
		
		return cuidCollaborateur;
	}
	@PostMapping(value = "/CuidCollaborateurs")
	public CuidCollaborateurs addOne(@RequestBody CuidCollaborateurs cuidCollaborateurs){	    
		System.out.println(cuidCollaborateurs);
		return cuidCollaborateurRepository.save(cuidCollaborateurs);
	}
	*/
}
