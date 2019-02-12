package com.capgemini.referentielcuid.controller;

import java.util.List;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.capgemini.referentielcuid.exception.ConflictException;
import com.capgemini.referentielcuid.exception.NotFoundException;
import com.capgemini.referentielcuid.model.Cuid;
import com.capgemini.referentielcuid.model.CuidInfos;
import com.capgemini.referentielcuid.service.CuidService;
import com.capgemini.referentielcuid.service.ServiceException;

@RestController
@CrossOrigin("*")
public class CuidController {

	//private static final Logger logger = LogManager.getLogger(CuidController.class);
	
	@Autowired
	private CuidService cuidService;

	@GetMapping(value = "/Cuid")
	public List<Cuid> listeCuids() throws ServiceException {
		List<Cuid> cuids = null;
		try {
			cuids = cuidService.findAll();
			if (cuids.isEmpty()) throw new NotFoundException("Aucun cuid n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return cuids;
	}

	@GetMapping(value = "/Cuid/{cuid}")
	public Optional<Cuid> afficherUnCuid(@PathVariable String cuid) throws ServiceException {
		Optional<Cuid> cuids = null;
		try {
			cuids = cuidService.findById(cuid);
			if (!cuids.isPresent()) throw new NotFoundException("Le cuid " + cuid + " est introuvable");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return cuids;
	}

	@GetMapping(value = "/CuidFromContrat/{contratId}")
	public List<Cuid> afficherUnCuidAvecContrat(@PathVariable int contratId) throws ServiceException {
		List<Cuid> cu = null;
		try {
			cu = cuidService.findCuidsContrat(contratId);
			if (cu.isEmpty()) throw new NotFoundException("Les cuids du contrat " + contratId + " sont introuvables");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return cu;
	}

	@GetMapping(value = "/TabCuids")
	public List<CuidInfos> afficherLeTabCuid() throws ServiceException {
		List<CuidInfos> cuidInfo = null;
		try {
			cuidInfo = cuidService.findAllCuidInfos();
			if (cuidInfo.isEmpty()) throw new NotFoundException("Aucun cuid n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return cuidInfo;
	}
	
	@GetMapping(value = "/TabCuids/{contratNom}")
	public List<CuidInfos> afficherTabCuidByContrat(@PathVariable String contratNom) throws ServiceException {
		List<CuidInfos> cuidInfo = null;
		try {
			cuidInfo = cuidService.findCuidInfosByContrat(contratNom);
			if (cuidInfo.isEmpty()) throw new NotFoundException("Aucun cuid n'a été trouvé");
		} catch (ServiceException e) {
			throw new ServiceException("Internal Server Exception");
		}
		return cuidInfo;
	}

	@PostMapping(value = "/Cuid")
	public ResponseEntity<Cuid> addOne(@Valid @RequestBody Cuid cuid) throws ServiceException {
		Cuid newCuid = null;
		try {
			newCuid = cuidService.addOne(cuid);
		} catch (ServiceException e) {
			throw new ConflictException("Erreur lors du POST du cuid : " + cuid.getCuid() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Cuid>(newCuid, HttpStatus.CREATED);
	}

	@PutMapping(value = "/Cuid")
	public ResponseEntity<Cuid> updateCuid(@RequestBody Cuid cuid) throws ServiceException {
		Cuid newCuid = null;
		try {
			cuid = cuidService.update(cuid);
		} catch (ServiceException e) {
			throw new NotFoundException("Erreur lors du PUT du cuid : " + cuid.getCuid() + " -> " + e.getMessage());
		}
		return new ResponseEntity<Cuid>(newCuid, HttpStatus.OK);
	}

	@DeleteMapping(value = "/Cuid")
	public ResponseEntity<Boolean> supprimerCuid(@RequestBody Cuid cuid) throws ServiceException {
		if (!cuidService.deleteById(cuid)) {
			throw new NotFoundException("Erreur lors du DELETE du cuid : " + cuid.getCuid());
		}
		return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
}
