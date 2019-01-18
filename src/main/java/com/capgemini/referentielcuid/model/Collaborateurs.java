package com.capgemini.referentielcuid.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "collaborateurs")
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class)
public class Collaborateurs {

	@Id
	@Size(max = 3, message = "le champ trigramme est trop long (max : {max})")
	private String trigrame;
	
	@Size(max = 30, message="le champ role est trop long (max : {max})")
	private String role;
	
	@Size(max = 10, message="le champ mdp est trop long (max : {max})")
	@JsonIgnore
	private String mdp;
	
	@NotNull(message = "le champ nom ne peut pas être null")
	@Size(max = 25, message="le champ nom est trop long (max : {max})")
	private String nom;
	
	@NotNull(message = "le champ prenom ne peut pas être null")
	@Size(max = 25, message="le champ prenom est trop long (max : {max})")
	private String prenom;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "localisation_id")
	@NotNull
	private Localisation localisation;
	
	@OneToMany(mappedBy =  "collaborateurs")
	@JsonIgnore
	private List<CuidCollaborateurs> cuidCollaborateurs;
	
	public Collaborateurs() {
	}
	public Collaborateurs(String trigrame, String role, String nom, String prenom, Localisation localisation) {
		super();
		this.trigrame = trigrame;
		this.role = role;
		this.nom = nom;
		this.prenom = prenom;
		this.localisation = localisation;
	}
	public String getTrigrame() {
		return trigrame;
	}
	public void setTrigrame(String trigrame) {
		this.trigrame = trigrame;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getMdp() {
		return mdp;
	}
	public void setMdp(String mdp) {
		this.mdp = mdp;
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
	public Localisation getLocalisation() {
		return localisation;
	}
	public void setLocalisation(Localisation localisation) {
		this.localisation = localisation;
	}
	public List<CuidCollaborateurs> getCuidCollaborateurs() {
		return cuidCollaborateurs;
	}
	public void setCuidCollaborateurs(List<CuidCollaborateurs> cuidCollaborateurs) {
		this.cuidCollaborateurs = cuidCollaborateurs;
	}
}
