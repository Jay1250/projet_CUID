package com.capgemini.referentielcuid.model;

import java.sql.Date;

public class Affectation {

	private String trigrame;
	
	private String cuid;
	
	private String contrat;
	
	private String nomprenom;
	
	private String pays;
	
	private Date dateaffectation;
	
	private Date dateliberation;
	
	public Affectation(CuidCollaborateurs cuidCollaborateur) {
		super();
		this.trigrame = cuidCollaborateur.getCollaborateurs().getTrigrame();
		this.cuid = cuidCollaborateur.getCuid().getCuid();
		this.contrat = cuidCollaborateur.getCuid().getContrat().getNom();
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
	
	public String getCuid() {
		return cuid;
	}

	public void setCuid(String cuid) {
		this.cuid = cuid;
	}
	
	public String getContrat() {
		return contrat;
	}

	public void setContrat(String contrat) {
		this.contrat = contrat;
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
