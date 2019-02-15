package com.capgemini.referentielcuid.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {
	public List<Application> findAllByOrderByNomApplicationAsc();
}
