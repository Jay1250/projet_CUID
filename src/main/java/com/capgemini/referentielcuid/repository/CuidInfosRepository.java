package com.capgemini.referentielcuid.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.CuidInfos;

public interface CuidInfosRepository extends JpaRepository<CuidInfos, String> {

}
