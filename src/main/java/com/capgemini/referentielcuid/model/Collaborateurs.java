package com.capgemini.referentielcuid.model;

import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name = "collaborateurs")
public class Collaborateurs {

	@Id
	@Size(max = 3)
	private String trigrame;
	
	@NotNull
	@Size(max = 4)
	private int statusCollaborateur;
	
	@Size(max = 30)
	private String role;
	
	@Size(max = 10)
	private String mdp;
	
	@NotNull
	@Size(max = 25)
	private String nom;
	
	@NotNull
	@Size(max = 25)
	private String prenom;
	
	@OneToMany(mappedBy = "collaborateurs")
	private Set<CuidCollaborateurs> cuidCollaborateurs;
}
