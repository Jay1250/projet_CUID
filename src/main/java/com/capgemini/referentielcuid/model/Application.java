package com.capgemini.referentielcuid.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Size;

import org.hibernate.validator.constraints.Range;

@Entity
@Table(name = "application")
public class Application {

	@Id
	@Range(max = 11, message = "le champ id est trop long (max : {max})")
	private int id;
	
	@Column(name = "nomapplication")
	@Size(max = 20, message="le champ nom d'application est trop long (max : {max})")
	private String nomApplication;
	
	@ManyToOne
	@JoinColumn(name = "contrat_id")
	private Contrat contrat;
	
	public Application() {
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNomApplication() {
		return nomApplication;
	}

	public void setNomApplication(String nomApplication) {
		this.nomApplication = nomApplication;
	}

	public Contrat getContrat() {
		return contrat;
	}

	public void setContrat(Contrat contrat) {
		this.contrat = contrat;
	}

	@Override
	public String toString() {
		return "Application [id=" + id + ", nomApplication=" + nomApplication + "]";
	}
}
