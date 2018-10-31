package com.capgemini.referentielcuid.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.model.Cuid;
import com.capgemini.referentielcuid.repository.CollaborateursRepository;
import com.capgemini.referentielcuid.repository.CuidRepository;

@RestController
public class CuidController {

	@Autowired
	private CuidRepository cuidRepository;
	
	@GetMapping(value = "/Cuid")
	public Iterable<Cuid> listeCuid(){
		
		Iterable<Cuid> cuids = cuidRepository.findAll();
		
		return cuids;
	}
	
}
