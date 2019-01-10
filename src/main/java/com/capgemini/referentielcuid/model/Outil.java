package com.capgemini.referentielcuid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "outil")
public class Outil {

	@Id
	@Range(max = 11, message = "le champ id collaborateur est trop long (max : {max})")
	private int id;
	
	@NotNull(message = "le champ nomOutil ne peut pas être null")
	@Column(name = "nomoutil")
	@Size(max =20, message="le champ nom outil est trop long (max : {max})")
	private String nomOutil;
	
	public Outil() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNomOutil() {
		return nomOutil;
	}

	public void setNomOutil(String nomOutil) {
		this.nomOutil = nomOutil;
	}

	@Override
	public String toString() {
		return "Outil [id=" + id + ", nomOutil=" + nomOutil + "]";
	}
}
