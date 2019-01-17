package com.capgemini.referentielcuid.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MapsId;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cuid_collaborateurs")
public class CuidCollaborateurs implements Serializable{
	
	@EmbeddedId
	@JsonIgnore
	private CuidCollaborateursId cuidcollaborateur;
	
	@ManyToOne
	@MapsId("cuid")
	private Cuid cuid;
	
	@ManyToOne
	@MapsId("trigrame")
	private Collaborateurs collaborateurs;
	
	@Column(name = "dateaffectation")
	private Date dateaffectation;
	
	@Column(name = "dateliberation")
	private Date dateliberation;
	
	public CuidCollaborateursId getCuidcollaborateur() {
		return cuidcollaborateur;
	}

	public void setCuidcollaborateur(CuidCollaborateursId cuidcollaborateur) {
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

	public Cuid getCuid() {
		return cuid;
	}

	public void setCuid(Cuid cuid) {
		this.cuid = cuid;
	}

	public Collaborateurs getCollaborateurs() {
		return collaborateurs;
	}

	public void setCollaborateurs(Collaborateurs collaborateurs) {
		this.collaborateurs = collaborateurs;
	}

	@Override
	public String toString() {
		return "CuidCollaborateur [cuidcollaborateur=" + cuidcollaborateur + ", dateaffectation=" + dateaffectation
				+ ", dateliberation=" + dateliberation + "]";
	}
}

