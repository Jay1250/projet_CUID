package com.capgemini.referentielcuid.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.CollaborateurInfos;
import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.repository.CollaborateursRepository;



@Service
public class CollaborateursService {

	@Autowired
	private CollaborateursRepository collaborateurRepository;
	
	//Autowired
	//private CollaborateurInfosRepository collaborateurInfosRepository;
	
	public List<Collaborateurs> findAll() throws ServiceException {
		return collaborateurRepository.findAll();
	}
	
	public Optional<Collaborateurs> findById(String trigrame) throws ServiceException {
		return collaborateurRepository.findById(trigrame);
	}
	
	public List<CollaborateurInfos> findAllCollaborateurInfos() throws ServiceException {
		List<CollaborateurInfos> collabInfo = new ArrayList<CollaborateurInfos>();
		List<Collaborateurs> collab = findAll();
		for(Collaborateurs col: collab) 
			collabInfo.add(new CollaborateurInfos(col, col.getCuidCollaborateurs().size()));
		return collabInfo;
	}
	
	public Collaborateurs addOne(Collaborateurs collaborateur) throws ServiceException {	    
		Optional<Collaborateurs> old = collaborateurRepository.findById(collaborateur.getTrigrame());
		if(old.isPresent()) throw new ServiceException("Trigramme déjà existant");
		return collaborateurRepository.save(collaborateur);
	}
	
	public Collaborateurs update(Collaborateurs collaborateur) throws ServiceException  {
		Optional<Collaborateurs> old = collaborateurRepository.findById(collaborateur.getTrigrame());
		if (!old.isPresent()) throw new ServiceException("Collaborateur introuvable");
		return collaborateurRepository.save(collaborateur);
	}
	
	public boolean deleteById(Collaborateurs collaborateur) throws ServiceException {
		Optional<Collaborateurs> collab = collaborateurRepository.findById(collaborateur.getTrigrame());
		if (collab.isPresent()) throw new ServiceException("Collaborateur introuvable"); 
		collaborateurRepository.deleteById(collaborateur.getTrigrame());
		return true;
	}
}
