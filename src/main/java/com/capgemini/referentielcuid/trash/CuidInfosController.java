package com.capgemini.referentielcuid.trash;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.referentielcuid.model.CuidInfos;
import com.capgemini.referentielcuid.repository.CuidInfosRepository;

@RestController
@CrossOrigin("*")
public class CuidInfosController {

	@Autowired
	private CuidInfosRepository cuidInfosRepository;
	
	@GetMapping(value = "/CuidInfos")
	public Iterable<CuidInfos> listeCuids(){
		
		Iterable<CuidInfos> cuidInfos = cuidInfosRepository.findAll();
		
		return cuidInfos;
	}
	
	@GetMapping(value = "/CuidInfos/{cuid}")
	public Optional<CuidInfos> afficherUnCuidInfo(@PathVariable String cuid) {
		
		return cuidInfosRepository.findById(cuid);
	}
	
}
