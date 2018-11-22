package com.capgemini.referentielcuid.controller;

import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.referentielcuid.exception.ConflictException;
import com.capgemini.referentielcuid.exception.NotFoundException;
import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.model.Cuid;
import com.capgemini.referentielcuid.service.CuidService;

@RestController
@CrossOrigin("*")
public class CuidController {

	@Autowired
	private CuidService cuidService;
	
	@GetMapping(value = "/Cuid")
	public Iterable<Cuid> listeCuid(){
		Iterable<Cuid> cuids = cuidService.findAll();
		return cuids;
	}
	
	@GetMapping(value = "/Cuid/{cuid}")
	public Optional<Cuid> afficherUnCuid(@PathVariable String cuid){
		return cuidService.findById(cuid);
	}
	
	@PostMapping(value = "/Cuid")
	public ResponseEntity<Cuid> addOne(@Valid @RequestBody Cuid cuid) {
		Cuid newCuid = null;
		try {
			newCuid = cuidService.addOne(cuid);
		} catch(Exception e) {
			throw new ConflictException("Erreur lors du POST du cuid : " + cuid.getCuid() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Cuid>(newCuid, HttpStatus.ACCEPTED);
	}
	
	@PutMapping(value = "/Cuid")
	public ResponseEntity<Cuid> updateCuid(@RequestBody Cuid cuid) {
		Cuid newCuid = null;
		try {
			cuid = cuidService.update(cuid);
		} catch (Exception e) {
			throw new NotFoundException("Erreur lors du PUT du cuid : " + cuid.getCuid() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Cuid>(newCuid, HttpStatus.ACCEPTED);
	}
	
	public ResponseEntity<Boolean> supprimerCuid(@PathVariable String cuid) {
		if (!cuidService.deleteById(cuid)) {
			throw new NotFoundException("Erreur lors du DELETE du cuid : " + cuid);
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
	}
}
