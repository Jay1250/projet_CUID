package com.capgemini.referentielcuid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cuid_infos")
public class CuidInfos {

	@Id
	@Column(name = "cuid")
	@JsonIgnore
	private String cuidId;
	
	@JsonIgnore
	private String nom;
	
	@JsonIgnore
	private String prenom;
	
	@JsonIgnore
	private String status;
	
	@JsonIgnore
	private String commentaires;
	
	@JsonIgnore
	@Column(name = "nomgir")
	private String nomGir;
	
	@JsonIgnore
	@Column(name = "prenomgir")
	private String prenomGir;
	
	@JsonIgnore
	private String contrat_id;
	
	@JsonIgnore
	private String application_id;
	
	@JsonIgnore
	private String outil_id;
	
	@Transient
	private Cuid cuid;
	
	private int nbcollab;

	private int nbapplis;
	
	public CuidInfos() {
	}
	
	public CuidInfos(Cuid cuid, int nbcollab, int nbapplis) {
		super();
		this.cuid = cuid;
		this.nbcollab = nbcollab;
		this.nbapplis = nbapplis;
	}

	public String getCuidId() {
		return cuidId;
	}

	public void setCuidId(String cuidId) {
		this.cuidId = cuidId;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getCommentaires() {
		return commentaires;
	}

	public void setCommentaires(String commentaires) {
		this.commentaires = commentaires;
	}

	public String getNomGir() {
		return nomGir;
	}

	public void setNomGir(String nomGir) {
		this.nomGir = nomGir;
	}

	public String getPrenomGir() {
		return prenomGir;
	}

	public void setPrenomGir(String prenomGir) {
		this.prenomGir = prenomGir;
	}
/*
	public String getContrat() {
		return contrat;
	}

	public void setContrat(String contrat) {
		this.contrat = contrat;
	}
*/
	public Cuid getCuid() {
		return cuid;
	}

	public void setCuid(Cuid cuid) {
		this.cuid = cuid;
	}

	public int getNbcollab() {
		return nbcollab;
	}

	public void setNbcollab(int nbcollab) {
		this.nbcollab = nbcollab;
	}

	public int getNbapplis() {
		return nbapplis;
	}

	public void setNbapplis(int nbapplis) {
		this.nbapplis = nbapplis;
	}
}
