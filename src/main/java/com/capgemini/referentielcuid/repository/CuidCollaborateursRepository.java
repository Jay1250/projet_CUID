package com.capgemini.referentielcuid.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.Collaborateurs;
import com.capgemini.referentielcuid.model.Cuid;
import com.capgemini.referentielcuid.model.CuidCollaborateurs;
import com.capgemini.referentielcuid.model.CuidCollaborateursId;

public interface CuidCollaborateursRepository extends JpaRepository<CuidCollaborateurs, CuidCollaborateursId> {
	
	public List<CuidCollaborateurs> findByCollaborateurs(Collaborateurs collaborateur);
	public List<CuidCollaborateurs> findByCuid(Cuid cuid);
	
}
