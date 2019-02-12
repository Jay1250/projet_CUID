package com.capgemini.referentielcuid.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.capgemini.referentielcuid.model.Contrat;

public interface ContratRepository extends JpaRepository<Contrat, Integer> {

	public Optional<Contrat> findByNom(String nom);
}
