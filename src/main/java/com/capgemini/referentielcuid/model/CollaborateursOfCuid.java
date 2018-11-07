package com.capgemini.referentielcuid.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "collaborateurs_of_cuid")
public class CollaborateursOfCuid {

	@Id 
	private String cuid;
	
	private String trigrame;
	private int statuscollaborateur;
	private String nom;
	private String prenom;
	private String pays;
	private Date dateaffectation;
	private Date dateliberation;
	
	public CollaborateursOfCuid() {
	}
	
	public String getCuid() {
		return cuid;
	}
	public void setCuid(String cuid) {
		this.cuid = cuid;
	}
	public String getTrigrame() {
		return trigrame;
	}
	public void setTrigrame(String trigrame) {
		this.trigrame = trigrame;
	}

	public int getStatuscollaborateur() {
		return statuscollaborateur;
	}
	public void setStatuscollaborateur(int statuscollaborateur) {
		this.statuscollaborateur = statuscollaborateur;
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
	public Date getDateaffectation() {
		return dateaffectation;
	}
	public void setDateaffectation(Date dateaffectation) {
		this.dateaffectation = dateaffectation;
	}
	public Date getDateliberation() {
		return dateliberation;
	}
	public void setDateliberation(Date dateliberation) {
		this.dateliberation = dateliberation;
	}

	@Override
	public String toString() {
		return "CollaborateursOfCuid [cuid=" + cuid + ", trigrame=" + trigrame + ", statuscollaborateur="
				+ statuscollaborateur + ", nom=" + nom + ", prenom=" + prenom + ", pays=" + pays + ", dateaffectation="
				+ dateaffectation + ", dateliberation=" + dateliberation + "]";
	}
}
