package com.capgemini.referentielcuid.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "contrat")
public class Contrat {

	@Id 
	@Range(max = 11, message = "le champ id est trop long (max : {max})")
	private int id;
	
	@Size(max = 20, message="le champ nom est trop long (max : {max})")
	private String nom;

	public Contrat() {
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNom() {
		return nom;
	}

	public void setNom(String nom) {
		this.nom = nom;
	}
}
