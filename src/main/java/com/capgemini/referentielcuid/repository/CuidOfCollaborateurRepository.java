package com.capgemini.referentielcuid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.CuidOfCollaborateur;

public interface CuidOfCollaborateurRepository extends JpaRepository<CuidOfCollaborateur, String>{

	public CuidOfCollaborateur findByTrigrameAndDateliberationIsNull(String trigrame);
	public CuidOfCollaborateur findByTrigrameAndDateliberationIsNotNull(String trigrame);
}
