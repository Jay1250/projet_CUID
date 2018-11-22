package com.capgemini.referentielcuid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.CuidCollaborateurs;
import com.capgemini.referentielcuid.model.CuidCollaborateursId;

public interface CuidCollaborateursRepository extends JpaRepository<CuidCollaborateurs, CuidCollaborateursId> {
	
	//public Collaborateurs findByCuid(String );
	
}
