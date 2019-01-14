package com.capgemini.referentielcuid.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.model.Cuid;
import com.capgemini.referentielcuid.model.CuidCollaborateurs;
import com.capgemini.referentielcuid.repository.CollaborateursRepository;
import com.capgemini.referentielcuid.repository.CuidCollaborateursRepository;

@Service
public class CuidCollaborateursService {

	@Autowired
	private CuidCollaborateursRepository cuidCollaborateursRepository;
	
	@Autowired
	private CollaborateursRepository collaborateursRepository;
	
	@Autowired
	private CuidService cuidService;

	public List<CuidCollaborateurs> findAll() throws ServiceException {
		return cuidCollaborateursRepository.findAll();
	}
	
	public List<CuidCollaborateurs> findByCollaborateurs(String trigrame) throws ServiceException {
		Optional<Collaborateurs> collab = collaborateursRepository.findById(trigrame);
		return cuidCollaborateursRepository.findByCollaborateurs(collab.get());
	}
	
	public List<CuidCollaborateurs> findByCuid(String id) throws ServiceException {
		Optional<Cuid> cuid = cuidService.findById(id);
		return cuidCollaborateursRepository.findByCuid(cuid.get());
	}
	
	public CuidCollaborateurs addOne(CuidCollaborateurs cuidCollaborateurs) throws ServiceException {	    
		Optional<CuidCollaborateurs> old = cuidCollaborateursRepository.findById(cuidCollaborateurs.getCuidcollaborateurId());
		if(old.isPresent()) throw new ServiceException("CuidCollaborateur déjà existant");
		return cuidCollaborateursRepository.save(cuidCollaborateurs);
	}
	
	public CuidCollaborateurs update(CuidCollaborateurs cuidCollaborateurs) throws ServiceException {
		Optional<CuidCollaborateurs> old = cuidCollaborateursRepository.findById(cuidCollaborateurs.getCuidcollaborateurId());
		if (!old.isPresent()) throw new ServiceException("CuidCollaborateur introuvable");
		return cuidCollaborateursRepository.save(cuidCollaborateurs);
	}
	
	public boolean deleteById(CuidCollaborateurs cuidCollaborateurs) throws ServiceException {
		Optional<CuidCollaborateurs> collab = cuidCollaborateursRepository.findById(cuidCollaborateurs.getCuidcollaborateurId());
		if (collab.isPresent()) throw new ServiceException("CuidCollaborateur introuvable");
		cuidCollaborateursRepository.deleteById(cuidCollaborateurs.getCuidcollaborateurId());
		return true;
	}
}
