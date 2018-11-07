package com.capgemini.referentielcuid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.Application;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

}
