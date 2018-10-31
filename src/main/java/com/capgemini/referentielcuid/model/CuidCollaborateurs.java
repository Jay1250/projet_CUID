package com.capgemini.referentielcuid.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@IdClass(CuidCollaborateurs.class)
@Table(name = "cuid_collaborateurs")
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class)
public class CuidCollaborateurs implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@ManyToOne
	@JoinColumn(name = "cuid_cuid")
	private Cuid cuid;
	
	@Id
	@ManyToOne
	@JoinColumn(name = "collaborateurs_trigrame")
	private Collaborateurs collaborateurs;
	
	@Column(name ="dateaffectation")
	@NotNull
	private Date dateAffectation;
	
	@Column(name ="dateliberation")
	private Date dateLiberation;
	
	public CuidCollaborateurs() {
		super();
	}
	
	public CuidCollaborateurs(Cuid cuid, Collaborateurs collaborateurs) {
		super();
		this.cuid = cuid;
		this.collaborateurs = collaborateurs;
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

	public Date getDateAffectation() {
		return dateAffectation;
	}

	public void setDateAffectation(Date dateAffectation) {
		this.dateAffectation = dateAffectation;
	}

	public Date getDateLiberation() {
		return dateLiberation;
	}

	public void setDateLiberation(Date dateLiberation) {
		this.dateLiberation = dateLiberation;
	}

	@Override
	public String toString() {
		return "CuidCollaborateurs [cuid=" + cuid + ", collaborateurs=" + collaborateurs + ", dateAffectation="
				+ dateAffectation + ", dateLiberation=" + dateLiberation + "]";
	}
}
