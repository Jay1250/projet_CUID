package com.capgemini.referentielcuid.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

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
	private String commentaires;
	
	@NotNull
	@Size(max = 25)
	private String nomgir;
	
	@NotNull
	@Size(max = 25)
	private String prenomgir;
	
	@OneToMany(mappedBy = "cuid")
	@JsonIgnore
	private Set<CuidCollaborateurs> cuidCollaborateurs;

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

	@Override
	public String toString() {
		return "Cuid [cuid=" + cuid + ", nom=" + nom + ", prenom=" + prenom + ", mdp=" + mdp + ", status=" + status
				+ ", commentaire=" + commentaires + ", nomGir=" + nomgir + ", prenomGir=" + prenomgir
				+ ", cuidCollaborateurs="  + "]";
	}
}
