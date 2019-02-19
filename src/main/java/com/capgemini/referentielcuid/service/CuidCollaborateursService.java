package com.capgemini.referentielcuid.service;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.Affectation;
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
	
	public List<Affectation> findAllAffectations() throws ServiceException {
		List<CuidCollaborateurs> cuidCollaborateur = cuidCollaborateursRepository.findAll();
		List<Affectation> affectations = new ArrayList<Affectation>();
		for(CuidCollaborateurs cu: cuidCollaborateur)
			affectations.add(new Affectation(cu));
		return affectations;
	}
	
	public List<Affectation> findAffectationsEnCours() throws ServiceException {
		List<CuidCollaborateurs> cuidCollaborateur = cuidCollaborateursRepository.findAll();
		List<Affectation> affectations = new ArrayList<Affectation>();
		Long millis = System.currentTimeMillis();
		Date today = new Date(millis);
		for(CuidCollaborateurs cu: cuidCollaborateur) {
			if(cu.getDateliberation() != null) {
				if(cu.getDateliberation().compareTo(today) == 1 || cu.getDateliberation().compareTo(today) == 0)
					affectations.add(new Affectation(cu));
			}
			else
				affectations.add(new Affectation(cu));
		}
		return affectations;
	}
	
	public List<Affectation> findAffectationsExpirees() throws ServiceException {
		List<CuidCollaborateurs> cuidCollaborateur = cuidCollaborateursRepository.findAll();
		List<Affectation> affectations = new ArrayList<Affectation>();
		Long millis = System.currentTimeMillis();
		Date today = new Date(millis);
		for(CuidCollaborateurs cu: cuidCollaborateur) {
			if(cu.getDateliberation() != null)
				if(cu.getDateliberation().compareTo(today) == -1)
					affectations.add(new Affectation(cu));
		}
		return affectations;
	}
	
	public List<Affectation> findAffectationsByCollab(String trigrame) throws ServiceException {
		List<CuidCollaborateurs> cuidCollaborateur = findByCollaborateurs(trigrame);
		List<Affectation> affectations = new ArrayList<Affectation>();
		for(CuidCollaborateurs cu: cuidCollaborateur)
			affectations.add(new Affectation(cu));
		return affectations;
	}
	
	public List<Affectation> findAffectationsByCuid(String id) throws ServiceException {
		List<CuidCollaborateurs> cuidCollaborateur = findByCuid(id);
		List<Affectation> affectations = new ArrayList<Affectation>();
		for(CuidCollaborateurs cu: cuidCollaborateur)
			affectations.add(new Affectation(cu));
		return affectations;
	}
	
	public CuidCollaborateurs addOne(CuidCollaborateurs cuidCollaborateurs) throws ServiceException {	    
		Optional<CuidCollaborateurs> old = cuidCollaborateursRepository.findById(cuidCollaborateurs.getCuidcollaborateur());
		if(old.isPresent()) throw new ServiceException("CuidCollaborateur déjà existant");
		return cuidCollaborateursRepository.save(cuidCollaborateurs);
	}
	
	public CuidCollaborateurs update(CuidCollaborateurs cuidCollaborateurs) throws ServiceException {
		Optional<CuidCollaborateurs> old = cuidCollaborateursRepository.findById(cuidCollaborateurs.getCuidcollaborateur());
		if (!old.isPresent()) throw new ServiceException("CuidCollaborateur introuvable");
		return cuidCollaborateursRepository.save(cuidCollaborateurs);
	}
	
	public boolean deleteById(CuidCollaborateurs cuidCollaborateurs) throws ServiceException {
		Optional<CuidCollaborateurs> collab = cuidCollaborateursRepository.findById(cuidCollaborateurs.getCuidcollaborateur());
		if (!collab.isPresent()) throw new ServiceException("CuidCollaborateur introuvable");
		cuidCollaborateursRepository.deleteById(cuidCollaborateurs.getCuidcollaborateur());
		return true;
	}
}
