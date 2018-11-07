package com.capgemini.referentielcuid.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cuid_of_collaborateur")
public class CuidOfCollaborateur {

	@Id
	private String trigrame;
	
	private String cuid;
	private String nom;
	private String prenom;
	private int status;
	private String commentaires;
	private String nomgir;
	private String prenomgir;
	private Date dateaffectation;
	private Date dateliberation;
	
	public CuidOfCollaborateur() {
	}
	
	public String getTrigrame() {
		return trigrame;
	}

	public void setTrigrame(String trigrame) {
		this.trigrame = trigrame;
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
	public Date getDateaffectation() {
		return dateaffectation;
	}
	public void setDateaffectation(Date dateaffectation) {
		this.dateaffectation = dateaffectation;
	}
	public Date getDateliberation() {
		return dateliberation;
	}
	public void setDateliberation(Date dateliberation) {
		this.dateliberation = dateliberation;
	}

	@Override
	public String toString() {
		return "CuidOfCollaborateur [trigrame=" + trigrame + ", cuid=" + cuid + ", nom=" + nom + ", prenom=" + prenom
				+ ", status=" + status + ", commentaires=" + commentaires + ", nomgir=" + nomgir + ", prenomgir="
				+ prenomgir + ", dateaffectation=" + dateaffectation + ", dateliberation=" + dateliberation + "]";
	}
}
