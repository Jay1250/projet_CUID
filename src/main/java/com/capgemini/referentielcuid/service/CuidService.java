package com.capgemini.referentielcuid.service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.capgemini.referentielcuid.model.Cuid;
import com.capgemini.referentielcuid.model.CuidInfos;
import com.capgemini.referentielcuid.repository.CuidInfosRepository;
import com.capgemini.referentielcuid.repository.CuidRepository;




@Service
public class CuidService {

	//private static Logger logger = Logger.getLogger(CuidService.class);
	
	//private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	Logger logger = Logger.getLogger("logger");

	
	@Autowired
	private CuidRepository cuidRepository;
	
	@Autowired
	private CuidInfosRepository cuidInfosRepository;
	

	public List<Cuid> findCuidsContrat(int contratId) throws ServiceException {
		return cuidRepository.findByContratId(contratId);
	}
	
	public List<Cuid> findAll() throws ServiceException{
		return cuidRepository.findAll();
	}
	
	public Optional<Cuid> findById(String cuid) throws ServiceException{
 
	
		return cuidRepository.findById(cuid);
	}
	
	public List<CuidInfos> findAllCuidInfos() throws ServiceException{
		return cuidInfosRepository.findAll();	
	}
	
	//public List<CollaborateursOfCuid> findAllCollaborateurs
	
	public Cuid addOne(Cuid cuid) throws ServiceException {	    
		Optional<Cuid> old = cuidRepository.findById(cuid.getCuid());
		if(old.isPresent()) throw new ServiceException("Cuid déjà existant");
		return cuidRepository.save(cuid);
	}
	
	public Cuid update(Cuid cuid) throws ServiceException  {
		Optional<Cuid> old = cuidRepository.findById(cuid.getCuid());
		if (!old.isPresent())
			throw new ServiceException("Cuid introuvable");
		return cuidRepository.save(cuid);
	}
	
	public boolean deleteById(String cuid) throws ServiceException {
		Optional<Cuid> collab = cuidRepository.findById(cuid);
		if (collab.isPresent()) {
			cuidRepository.deleteById(cuid);
			return true;
		}
		return false;
	}
}
