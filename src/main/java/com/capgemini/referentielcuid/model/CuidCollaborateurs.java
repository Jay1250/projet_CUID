package com.capgemini.referentielcuid.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

@Entity
@Table(name = "cuid_collaborateurs")
public class CuidCollaborateurs implements Serializable{
	
	@EmbeddedId
	private CuidCollaborateursId cuidcollaborateur;
	
	@Column(name = "dateaffectation")
	private Date dateaffectation;
	
	@Column(name = "dateliberation")
	private Date dateliberation;
	
	
	
	
	/*
	public CuidCollaborateurs(String cuid, String collaborateur) {
		this.cuidcollaborateur = new CuidCollaborateursId(cuid, collaborateur);
	}
*/
	public CuidCollaborateursId getCuidcollaborateurId() {
		return cuidcollaborateur;
	}

	public void setCuidcollaborateurId(CuidCollaborateursId cuidcollaborateur) {
		this.cuidcollaborateur = cuidcollaborateur;
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
		return "CuidCollaborateur [cuidcollaborateur=" + cuidcollaborateur + ", dateaffectation=" + dateaffectation
				+ ", dateliberation=" + dateliberation + "]";
	}
	
	
	
}

