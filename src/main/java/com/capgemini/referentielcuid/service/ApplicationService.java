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
	
	public List<Application> findAll() {
		return applicationRepository.findAll();
	}
	
	public Optional<Application> findById(int id){
		return applicationRepository.findById(id);
	}
	
	public Application addOne(Application application) throws Exception {	    
		Optional<Application> old = applicationRepository.findById(application.getId());
		if(old.isPresent())
			throw new Exception("Application déjà existant");
		return applicationRepository.save(application);
	}
	
	public Application update(Application application) throws Exception  {
		Optional<Application> old = applicationRepository.findById(application.getId());
		if (!old.isPresent())
			throw new Exception("Collaborateur introuvable");
		return applicationRepository.save(application);
	}
	
	public boolean deleteById(int  id) {
		Optional<Application> collab = applicationRepository.findById(id);
		if (collab.isPresent()) {
			applicationRepository.deleteById(id);
			return true;
		}
		return false;
	}
}
