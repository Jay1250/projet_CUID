package com.capgemini.referentielcuid.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.Cuid;
import com.capgemini.referentielcuid.model.CuidInfos;
import com.capgemini.referentielcuid.repository.CuidRepository;

@Service
public class CuidService {

	@Autowired
	private CuidRepository cuidRepository;

	//@Autowired
	//private CuidInfosRepository cuidInfosRepository;

	public List<Cuid> findCuidsContrat(int contratId) throws ServiceException {
		return cuidRepository.findByContratId(contratId);
	}

	public List<Cuid> findAll() throws ServiceException {
		return cuidRepository.findAll();
	}

	public Optional<Cuid> findById(String cuid) throws ServiceException {
		return cuidRepository.findById(cuid);
	}

	public List<CuidInfos> findAllCuidInfos() throws ServiceException {
		List<CuidInfos> cuidInfo = new ArrayList<CuidInfos>();
		List<Cuid> cuid = findAll();
		for (Cuid cu: cuid) 
			cuidInfo.add(new CuidInfos(cu , cu.getCuidCollaborateurs().size(), cu.getApplications().size()));
		return cuidInfo;
	}

	public Cuid addOne(Cuid cuid) throws ServiceException {
		Optional<Cuid> old = cuidRepository.findById(cuid.getCuid());
		if (old.isPresent()) throw new ServiceException("Cuid déjà existant");
		return cuidRepository.save(cuid);
	}

	public Cuid update(Cuid cuid) throws ServiceException {
		Optional<Cuid> old = cuidRepository.findById(cuid.getCuid());
		if (!old.isPresent()) throw new ServiceException("Cuid introuvable");
		return cuidRepository.save(cuid);
	}

	public boolean deleteById(Cuid cuid) throws ServiceException {
		Optional<Cuid> collab = cuidRepository.findById(cuid.getCuid());
		if (!collab.isPresent()) throw new ServiceException("Cuid introuvable");
		cuidRepository.deleteById(cuid.getCuid());
		return true;
	}
}
