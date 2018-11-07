package com.capgemini.referentielcuid.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

@Entity
@Table(name = "cuid")
@JsonIdentityInfo(generator=ObjectIdGenerators.IntSequenceGenerator.class)
public class Cuid {

	@Id
	@Size(max = 9, message = "le champ cuid est trop long (max : {max})")
	private String cuid;
	
	@NotNull(message = "le champ nom ne peut pas être null")
	@Size(max = 25, message = "le champ nom est trop long (max : {max})")
	private String nom;
	
	@NotNull(message = "le champ prenom ne peut pas être null")
	@Size(max = 25, message = "le champ prenom est trop long (max : {max})")
	private String prenom;
	
	@Size(max = 10, message = "le champ mdp est trop long (max : {max})")
	private String mdp;
	
	@NotNull(message = "le champ status ne peut pas être null")
	@Range(max = 4, message = "le champ status est trop long (max : {max})")
	private int status;
	
	@Size(max = 250, message = "le champ commentaires est trop long (max : {max})")
	private String commentaires;
	
	@NotNull(message = "le champ nomgir ne peut pas être null")
	@Size(max = 25, message = "le champ nomgir est trop long (max : {max})")
	private String nomgir;
	
	@NotNull(message = "le champ prenomgir ne peut pas être null")
	@Size(max = 25, message = "le champ prenomgir est trop long (max : {max})")
	private String prenomgir;
	
	@OneToMany(mappedBy = "cuid")
	@JsonIgnore
	private Set<CuidCollaborateurs> cuidCollaborateurs;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "cuid_outil")
	private Set<Outil> outil = new HashSet<>();

	public Cuid() {
	}
	
	public String getCuid() {
		return cuid;
	}

	public void setCuid(String cuid) {
		this.cuid = cuid;
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

	public String getMdp() {
		return mdp;
	}

	public void setMdp(String mdp) {
		this.mdp = mdp;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public String getCommentaires() {
		return commentaires;
	}

	public void setCommentaires(String commentaires) {
		this.commentaires = commentaires;
	}

	public String getNomgir() {
		return nomgir;
	}

	public void setNomgir(String nomgir) {
		this.nomgir = nomgir;
	}

	public String getPrenomgir() {
		return prenomgir;
	}

	public void setPrenomgir(String prenomgir) {
		this.prenomgir = prenomgir;
	}

	public Set<CuidCollaborateurs> getCuidCollaborateurs() {
		return cuidCollaborateurs;
	}

	public void setCuidCollaborateurs(Set<CuidCollaborateurs> cuidCollaborateurs) {
		this.cuidCollaborateurs = cuidCollaborateurs;
	}

	public Set<Outil> getOutil() {
		return outil;
	}

	public void setOutil(Set<Outil> outil) {
		this.outil = outil;
	}

	@Override
	public String toString() {
		return "Cuid [cuid=" + cuid + ", nom=" + nom + ", prenom=" + prenom + ", mdp=" + mdp + ", status=" + status
				+ ", commentaire=" + commentaires + ", nomGir=" + nomgir + ", prenomGir=" + prenomgir
				+ ", cuidCollaborateurs="  + "]";
	}
}
