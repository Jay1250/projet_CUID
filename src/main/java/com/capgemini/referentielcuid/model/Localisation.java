package com.capgemini.referentielcuid.model;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Index;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name = "localisation")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Localisation implements Serializable{


	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@Size(max = 25)
	@NotNull
	private String pays;
	
	/*
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "localisation")
	private Set<Collaborateurs> Collaborateurs;
	*/
	public Localisation() {
	}
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPays() {
		return pays;
	}

	public void setPays(String pays) {
		this.pays = pays;
	}



	@Override
	public String toString() {
		return "Localisation [id=" + id + ", pays=" + pays + "]";
	}
	
}
