package com.capgemini.referentielcuid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "collaborateur_infos")
public class CollaborateurInfos {

	@Id
	@JsonIgnore
	private String trigrame;
	
	@JsonIgnore
	private String role;
	
	@JsonIgnore
	private String nom;
	
	@JsonIgnore
	private String prenom;
	
	@JsonIgnore
	@Column(name = "localisationid")
	private int localisationId;
	
	@Transient
	private Collaborateurs collaborateurs;
	
	@JsonIgnore
	@Column(name = "localisationpays")
	private String localisationPays;
	
	public CollaborateurInfos(Collaborateurs collaborateurs, int nbr_cuid) {
		super();
		this.collaborateurs = collaborateurs;
		this.nbr_cuid = nbr_cuid;
	}
	private int nbr_cuid;
	
	public String getTrigrame() {
		return trigrame;
	}
	public void setTrigrame(String trigrame) {
		this.trigrame = trigrame;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getNom() {
		return nom;
	}
	public void setNom(String nom) {
		this.nom = nom;
	}
	public String getPrenom() {
		return prenom;
	}
	public void setPrenom(String prenom) {
		this.prenom = prenom;
	}
	public int getLocalisationId() {
		return localisationId;
	}
	public void setLocalisationId(int localisationId) {
		this.localisationId = localisationId;
	}
	public String getLocalisationPays() {
		return localisationPays;
	}
	public void setLocalisationPays(String localisationPays) {
		this.localisationPays = localisationPays;
	}
	public Collaborateurs getCollaborateurs() {
		return collaborateurs;
	}
	public void setCollaborateur(Collaborateurs collaborateurs) {
		this.collaborateurs = collaborateurs;
	}
	public int getNbr_cuid() {
		return nbr_cuid;
	}
	public void setNbr_cuid(int nbr_cuid) {
		this.nbr_cuid = nbr_cuid;
	}
}
