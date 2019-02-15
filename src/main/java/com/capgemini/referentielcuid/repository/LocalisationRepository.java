package com.capgemini.referentielcuid.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.Localisation;

public interface LocalisationRepository extends JpaRepository<Localisation, Integer> {
	public List<Localisation> findAllByOrderByPaysAsc();
}
