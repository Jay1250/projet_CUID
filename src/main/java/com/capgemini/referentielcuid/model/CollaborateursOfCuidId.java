package com.capgemini.referentielcuid.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

@Embeddable
public class CollaborateursOfCuidId implements Serializable{
	
	
	@Column(name = "cuid")
	private String cuid;
	
	@Column(name = "trigrame")
	private String trigrame;
	
	public CollaborateursOfCuidId() {
		super();
	}
	
	public CollaborateursOfCuidId(String cuid, String trigrame) {
		super();
		this.cuid = cuid;
		this.trigrame = trigrame;
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

	@Override
	public String toString() {
		return "CuidCollaborateurId [cuid=" + cuid + ", trigrame=" + trigrame + "]";
	}
	
	
}