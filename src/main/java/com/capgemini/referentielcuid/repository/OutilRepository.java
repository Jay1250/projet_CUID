package com.capgemini.referentielcuid.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.Outil;

public interface OutilRepository extends JpaRepository<Outil, Integer> {
	public List<Outil> findAllByOrderByNomOutilAsc();
}
