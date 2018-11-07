package com.capgemini.referentielcuid.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.repository.CollaborateursRepository;



@Service
public class CollaborateursService {

	@Autowired
	private CollaborateursRepository collaborateurRepository;
	
	public List<Collaborateurs> findAll() {
		return collaborateurRepository.findAll();
	}
	
	public Optional<Collaborateurs> findById(String trigrame){
		return collaborateurRepository.findById(trigrame);
	}
	
	public Collaborateurs addOne(Collaborateurs collaborateur) throws Exception {	    
		Optional<Collaborateurs> old = collaborateurRepository.findById(collaborateur.getTrigrame());
		if(old.isPresent())
			throw new Exception("Trigramme déjà existant");
		return collaborateurRepository.save(collaborateur);
	}
	
	public Collaborateurs update(Collaborateurs collaborateur) throws Exception  {
		Optional<Collaborateurs> old = collaborateurRepository.findById(collaborateur.getTrigrame());
		if (!old.isPresent())
			throw new Exception("Collaborateur introuvable");
		return collaborateurRepository.save(collaborateur);
	}
	
	public boolean deleteById(String trigrame) {
		Optional<Collaborateurs> collab = collaborateurRepository.findById(trigrame);
		if (collab.isPresent()) {
			collaborateurRepository.deleteById(trigrame);
			return true;
		}
		return false;
	}
}
