package com.capgemini.referentielcuid.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.Outil;
import com.capgemini.referentielcuid.repository.OutilRepository;

@Service
public class OutilService {

	@Autowired
	private OutilRepository outilRepository;
	
	public List<Outil> findAll() {
		return outilRepository.findAll();
	}
	
	public Optional<Outil> findById(int id){
		return outilRepository.findById(id);
	}
	
	public Outil addOne(Outil outil) throws Exception {	    
		Optional<Outil> old = outilRepository.findById(outil.getId());
		if(old.isPresent())
			throw new Exception("Trigramme déjà existant");
		return outilRepository.save(outil);
	}
	
	public Outil update(Outil outil) throws Exception  {
		Optional<Outil> old = outilRepository.findById(outil.getId());
		if (!old.isPresent())
			throw new Exception("Collaborateur introuvable");
		return outilRepository.save(outil);
	}
	
	public boolean deleteById(int id) throws ServiceException {
		Optional<Outil> outil = outilRepository.findById(id);
		//if (outil.isPresent()) throw new ServiceException("Outil introuvable");
		outilRepository.deleteById(id);
		return true;
	}
}
