package com.capgemini.referentielcuid.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.Localisation;
import com.capgemini.referentielcuid.repository.LocalisationRepository;

@Service
public class LocalisationService {

	@Autowired
	private LocalisationRepository localisationRepository;
	
	public List<Localisation> findAll() throws ServiceException {
		return localisationRepository.findAll();
	}
	
	public Optional<Localisation> findById(int id) throws ServiceException {
		return localisationRepository.findById(id);
	}
	
	public Localisation addOne(Localisation localisation) throws ServiceException {	    
		Optional<Localisation> old = localisationRepository.findById(localisation.getId());
		if(old.isPresent()) throw new ServiceException("Localisation déjà existant");
		return localisationRepository.save(localisation);
	}
	
	public Localisation update(Localisation localisation) throws ServiceException {
		Optional<Localisation> old = localisationRepository.findById(localisation.getId());
		if (!old.isPresent()) throw new ServiceException("Localisation introuvable");
		return localisationRepository.save(localisation);
	}
	
	public boolean deleteById(int id) throws ServiceException {
		Optional<Localisation> app = localisationRepository.findById(id);
		if (app.isPresent()) throw new ServiceException("Localisation introuvable");
		localisationRepository.deleteById(id);
		return true;
	}
}
