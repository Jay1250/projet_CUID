package com.capgemini.referentielcuid.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.Application;
import com.capgemini.referentielcuid.repository.ApplicationRepository;

@Service
public class ApplicationService {

	@Autowired
	private ApplicationRepository applicationRepository;
	
	public List<Application> findAll() throws ServiceException {
		return applicationRepository.findAll();
	}
	
	public Optional<Application> findById(int id) throws ServiceException {
		return applicationRepository.findById(id);
	}
	
	public Application addOne(Application application) throws ServiceException {	    
		Optional<Application> old = applicationRepository.findById(application.getId());
		if(old.isPresent()) throw new ServiceException("Application déjà existant");
		return applicationRepository.save(application);
	}
	
	public Application update(Application application) throws ServiceException {
		Optional<Application> old = applicationRepository.findById(application.getId());
		if (!old.isPresent()) throw new ServiceException("Application introuvable");
		return applicationRepository.save(application);
	}
	
	public boolean deleteById(Application application) throws ServiceException {
		Optional<Application> collab = applicationRepository.findById(application.getId());
		if (collab.isPresent()) throw new ServiceException("Application introuvable");
		applicationRepository.deleteById(application.getId());
		return true;
	}
}
