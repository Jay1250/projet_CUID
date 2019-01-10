package com.capgemini.referentielcuid.trash;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CuidOfCollaborateurRepository extends JpaRepository<CuidOfCollaborateur, String>{

	public CuidOfCollaborateur findByTrigrameAndDateliberationIsNull(String trigrame);
	public CuidOfCollaborateur findByTrigrameAndDateliberationIsNotNull(String trigrame);
}
