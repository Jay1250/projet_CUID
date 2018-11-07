package com.capgemini.referentielcuid.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "collaborateur_infos")
public class CollaborateurInfos {

	@Id 
	private String trigrame;
	
	private String statuscollaborateur;
	private String role;
	private String nom;
	private String prenom;
	private String pays;
	private int nbr_cuid;
	
	public String getTrigrame() {
		return trigrame;
	}
	public void setTrigrame(String trigrame) {
		this.trigrame = trigrame;
	}

	public String getStatuscollaborateur() {
		return statuscollaborateur;
	}
	public void setStatuscollaborateur(String statuscollaborateur) {
		this.statuscollaborateur = statuscollaborateur;
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
	public String getPays() {
		return pays;
	}
	public void setPays(String pays) {
		this.pays = pays;
	}
	public int getNbr_cuid() {
		return nbr_cuid;
	}
	public void setNbr_cuid(int nbr_cuid) {
		this.nbr_cuid = nbr_cuid;
	}
}
