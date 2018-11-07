package com.capgemini.referentielcuid.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.Contrat;
import com.capgemini.referentielcuid.repository.ContratRepository;

@Service
public class ContratService {

	@Autowired
	private ContratRepository contratRepository;
	
	public List<Contrat> findAll() {
		return contratRepository.findAll();
	}
	
	public Optional<Contrat> findById(int id){
		return contratRepository.findById(id);
	}
	
	public Contrat addOne(Contrat contrat) throws Exception {	    
		Optional<Contrat> old = contratRepository.findById(contrat.getId());
		if(old.isPresent())
			throw new Exception("Application déjà existant");
		return contratRepository.save(contrat);
	}
	
	public Contrat update(Contrat contrat) throws Exception  {
		Optional<Contrat> old = contratRepository.findById(contrat.getId());
		if (!old.isPresent())
			throw new Exception("Collaborateur introuvable");
		return contratRepository.save(contrat);
	}
	
	public boolean deleteById(int  id) {
		Optional<Contrat> collab = contratRepository.findById(id);
		if (collab.isPresent()) {
			contratRepository.deleteById(id);
			return true;
		}
		return false;
	}
}
