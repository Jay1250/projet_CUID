package com.capgemini.referentielcuid.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.CollaborateursOfCuid;
import com.capgemini.referentielcuid.model.CuidCollaborateursId;

public interface CollaborateursOfCuidRepository extends JpaRepository<CollaborateursOfCuid, CuidCollaborateursId> {

	//public Iterable<CollaborateursOfCuid> findByCuidAndDateliberationIsNull(String trigrame);
	//public Iterable<CollaborateursOfCuid> findByCuidAndDateliberationIsNotNull(String trigrame);
	
	public List<CollaborateursOfCuid> findByCuidcollaborateur(CuidCollaborateursId cuidcollaborateur);
	public List<CollaborateursOfCuid> findByCuidcollaborateurCuid(String cuid);
}
