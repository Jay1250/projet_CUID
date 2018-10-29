package com.capgemini.referentielcuid.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "cuid")
public class Cuid {

	@Id
	@Size(max = 9)
	private String cuid;
	
	@NotNull
	@Size(max = 25)
	private String nom;
	
	@NotNull
	@Size(max = 25)
	private String prenom;
	
	@Size(max = 10)
	private String mdp;
	
	@NotNull
	@Size(max = 4)
	private int status;
	
	@Size(max = 250)
	private String commentaire;
	
	@NotNull
	@Size(max = 25)
	private String nomGir;
	
	@NotNull
	@Size(max = 25)
	private String prenomGir;
}
