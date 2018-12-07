package com.capgemini.referentielcuid.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.model.Cuid;
import com.capgemini.referentielcuid.repository.CuidRepository;

@Service
public class CuidService {

	@Autowired
	private CuidRepository cuidRepository;
	
	public List<Cuid> findCuidsContrat(int contratId) {
		return cuidRepository.findByContratId(contratId);
	}
	
	public List<Cuid> findAll() {
		return cuidRepository.findAll();
	}
	
	public Optional<Cuid> findById(String trigrame){
		return cuidRepository.findById(trigrame);
	}
	
	public Cuid addOne(Cuid cuid) throws Exception {	    
		Optional<Cuid> old = cuidRepository.findById(cuid.getCuid());
		if(old.isPresent())
			throw new Exception("Cuid déjà existant");
		return cuidRepository.save(cuid);
	}
	
	public Cuid update(Cuid cuid) throws Exception  {
		Optional<Cuid> old = cuidRepository.findById(cuid.getCuid());
		if (!old.isPresent())
			throw new Exception("Cuid introuvable");
		return cuidRepository.save(cuid);
	}
	
	public boolean deleteById(String cuid) {
		Optional<Cuid> collab = cuidRepository.findById(cuid);
		if (collab.isPresent()) {
			cuidRepository.deleteById(cuid);
			return true;
		}
		return false;
	}
}
