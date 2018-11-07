package com.capgemini.referentielcuid.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.query.Procedure;

import com.capgemini.referentielcuid.model.Collaborateurs;

public interface CollaborateursRepository extends JpaRepository<Collaborateurs, String> {
	
	public Collaborateurs findByTrigrame(String trigrame);
	
	@Procedure(name = "test_pro")
	void jetest();
}
