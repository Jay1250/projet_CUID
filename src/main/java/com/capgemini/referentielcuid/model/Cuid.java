package com.capgemini.referentielcuid.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
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
@Table(name = "cuid")
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class)
public class Cuid {

	@Id
	@Size(max = 9)
	private String cuid;

	@NotNull(message = "{javax.validation.constraints.NotNull.message}" + "le champ nom ne peut pas être null")
	@Size(max = 25, message = "le champ nom est trop long (max : {max})")
	private String nom;

	@NotNull(message = "le champ prenom ne peut pas être null")
	@Size(max = 25, message = "le champ prenom est trop long (max : {max})")
	private String prenom;

	@Size(max = 10, message = "le champ mdp est trop long (max : {max})")
	@JsonIgnore
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

	@ManyToOne
	private Contrat contrat;

	@ManyToMany
	private List<Application> applications;

	@ManyToMany
	private List<Outil> outil;

	@OneToMany(mappedBy = "cuid")
	@JsonIgnore
	private List<CuidCollaborateurs> cuidCollaborateurs;

	public Cuid() {
	}

	public List<CuidCollaborateurs> getCuidCollaborateurs() {
		return cuidCollaborateurs;
	}

	public void setCuidCollaborateurs(List<CuidCollaborateurs> cuidCollaborateurs) {
		this.cuidCollaborateurs = cuidCollaborateurs;
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
	/*
	 * public Set<Outil> getOutil() { return outil; }
	 * 
	 * public void setOutil(Set<Outil> outil) { this.outil = outil; }
	 */

	public Contrat getContrat() {
		return contrat;
	}

	public List<Outil> getOutil() {
		return outil;
	}

	public void setOutil(List<Outil> outils) {
		this.outil = outils;
	}

	public void setContrat(Contrat contrat) {
		this.contrat = contrat;
	}

	public List<Application> getApplications() {
		return applications;
	}

	public void setApplications(List<Application> applications) {
		this.applications = applications;
	}

	@Override
	public String toString() {
		return "Cuid [cuid=" + cuid + ", nom=" + nom + ", prenom=" + prenom + ", mdp=" + mdp + ", status=" + status
				+ ", commentaire=" + commentaires + ", nomGir=" + nomgir + ", prenomGir=" + prenomgir
				+ ", cuidCollaborateurs=" + "]";
	}
}
