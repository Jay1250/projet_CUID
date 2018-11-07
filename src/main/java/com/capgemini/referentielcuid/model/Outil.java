package com.capgemini.referentielcuid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "outil")
public class Outil {

	@Id
	@Range(max = 11, message = "le champ id collaborateur est trop long (max : {max})")
	private int id;
	
	@Column(name = "nomoutil")
	@Size(max =20, message="le champ nom outil est trop long (max : {max})")
	private String nomOutil;
	
	@Column(name = "nboutils")
	@Range(max = 11, message = "le champ nombre outils  collaborateur est trop long (max : {max})")
	private int nbOutils;
	
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

	public int getNbOutils() {
		return nbOutils;
	}

	public void setNbOutils(int nbOutils) {
		this.nbOutils = nbOutils;
	}

	@Override
	public String toString() {
		return "Outil [id=" + id + ", nomOutil=" + nomOutil + ", nbOutils=" + nbOutils + "]";
	}
}
