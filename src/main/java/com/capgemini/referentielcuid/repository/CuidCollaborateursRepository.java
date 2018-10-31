package com.capgemini.referentielcuid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.model.CuidCollaborateurs;

public interface CuidCollaborateursRepository extends JpaRepository<CuidCollaborateurs, String> {
	
	//public Collaborateurs findByCuid(String );
	
}
