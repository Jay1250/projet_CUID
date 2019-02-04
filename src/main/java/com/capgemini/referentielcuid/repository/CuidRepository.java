package com.capgemini.referentielcuid.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.Cuid;

public interface CuidRepository extends JpaRepository<Cuid, String> {
	
	public List<Cuid> findByContratId(int contratId);
}
