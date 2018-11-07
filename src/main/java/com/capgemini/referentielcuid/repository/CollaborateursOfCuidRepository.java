package com.capgemini.referentielcuid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.CollaborateursOfCuid;

public interface CollaborateursOfCuidRepository extends JpaRepository<CollaborateursOfCuid, String> {

	public Iterable<CollaborateursOfCuid> findByCuidAndDateliberationIsNull(String trigrame);
	public Iterable<CollaborateursOfCuid> findByCuidAndDateliberationIsNotNull(String trigrame);
}
