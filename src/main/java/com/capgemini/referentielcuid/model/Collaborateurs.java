package com.capgemini.referentielcuid.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "collaborateurs")
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class)
public class Collaborateurs {

	@Id
	@Size(max = 3)
	private String trigrame;
	
	@Column(name="statuscollaborateur")
	@NotNull
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
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "localisation_id")
	private Localisation localisation;
	
	@OneToMany(mappedBy = "collaborateurs")
	private Set<CuidCollaborateurs> cuidCollaborateurs;

	public Collaborateurs() {
		
	}
	
	public Collaborateurs(@Size(max = 3) String trigrame, @NotNull int statusCollaborateur, @Size(max = 30) String role,
			@Size(max = 10) String mdp, @NotNull @Size(max = 25) String nom, @NotNull @Size(max = 25) String prenom,
			Localisation localisation, Set<CuidCollaborateurs> cuidCollaborateurs) {
		super();
		this.trigrame = trigrame;
		this.statusCollaborateur = statusCollaborateur;
		this.role = role;
		this.mdp = mdp;
		this.nom = nom;
		this.prenom = prenom;
		this.localisation= localisation;
		this.cuidCollaborateurs = cuidCollaborateurs;
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

	public Set<CuidCollaborateurs> getCuidCollaborateurs() {
		return cuidCollaborateurs;
	}

	public void setCuidCollaborateurs(Set<CuidCollaborateurs> cuidCollaborateurs) {
		this.cuidCollaborateurs = cuidCollaborateurs;
	}

	@Override
	public String toString() {
		return "Collaborateurs [trigrame=" + trigrame + ", statusCollaborateur=" + statusCollaborateur + ", role="
				+ role + ", mdp=" + mdp + ", nom=" + nom + ", prenom=" + prenom + ", localisation=" + localisation
				+ ", cuidCollaborateurs=" + cuidCollaborateurs + "]";
	}
	
}
