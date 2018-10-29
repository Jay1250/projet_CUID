package com.capgemini.referentielcuid.model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "cuid_collaborateurs")
public class CuidCollaborateurs implements Serializable {

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
}
