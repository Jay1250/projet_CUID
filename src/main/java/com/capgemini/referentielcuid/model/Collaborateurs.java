package com.capgemini.referentielcuid.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

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
	
	@Column(name="statuscollaborateur")
	@NotNull(message = "le champ status collaborateur ne peut pas être null")

	@Range(max = 1, message = "le champ status collaborateur est trop long (max : {max})")
	private Integer statusCollaborateur;
	
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
	/*
	@JsonIgnore
	@OneToMany(mappedBy = "collaborateurs")
	private Set<CuidCollaborateurs> cuidCollaborateurs;
*/
	public Collaborateurs() {
	}
	
	public String getTrigrame() {
		return trigrame;
	}

	public void setTrigrame(String trigrame) {
		this.trigrame = trigrame;
	}

	public int getStatusCollaborateur() {
		return statusCollaborateur;
	}

	public void setStatusCollaborateur(int statusCollaborateur) {
		this.statusCollaborateur = statusCollaborateur;
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
/*
	public Set<CuidCollaborateurs> getCuidCollaborateurs() {
		return cuidCollaborateurs;
	}

	public void setCuidCollaborateurs(Set<CuidCollaborateurs> cuidCollaborateurs) {
		this.cuidCollaborateurs = cuidCollaborateurs;
	}
*/
	
}
