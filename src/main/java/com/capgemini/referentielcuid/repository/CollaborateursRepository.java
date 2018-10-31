package com.capgemini.referentielcuid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.Collaborateurs;

public interface CollaborateursRepository extends JpaRepository<Collaborateurs, String> {
	
	public Collaborateurs findByTrigrame(String trigrame);
}
