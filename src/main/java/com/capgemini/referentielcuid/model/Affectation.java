package com.capgemini.referentielcuid.model;

import java.sql.Date;

public class Affectation {

	private String trigrame;
	
	private String nomprenom;
	
	private String pays;
	
	private Date dateaffectation;
	
	private Date dateliberation;
	
	public Affectation(CuidCollaborateurs cuidCollaborateur) {
		super();
		this.trigrame = cuidCollaborateur.getCollaborateurs().getTrigrame();
		this.nomprenom = cuidCollaborateur.getCollaborateurs().getNom() + " " + cuidCollaborateur.getCollaborateurs().getPrenom();
		this.pays = cuidCollaborateur.getCollaborateurs().getLocalisation().getPays();
		this.dateaffectation = cuidCollaborateur.getDateaffectation();
		this.dateliberation = cuidCollaborateur.getDateliberation();
	}

	public String getTrigrame() {
		return trigrame;
	}

	public void setTrigrame(String trigrame) {
		this.trigrame = trigrame;
	}

	public String getNomprenom() {
		return nomprenom;
	}

	public void setNomprenom(String nomprenom) {
		this.nomprenom = nomprenom;
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
}
