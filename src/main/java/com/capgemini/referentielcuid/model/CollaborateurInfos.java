package com.capgemini.referentielcuid.model;

public class CollaborateurInfos {

	private String trigrame;
	
	private String role;

	private String nomprenom;
	
	private String pays;
	
	private int nbr_cuid;
	
	public CollaborateurInfos(Collaborateurs collaborateurs, int nbr_cuid) {
		super();
		this.trigrame = collaborateurs.getTrigrame();
		this.role = collaborateurs.getRole();
		this.nomprenom = collaborateurs.getNom() + " " + collaborateurs.getPrenom();
		this.pays = collaborateurs.getLocalisation().getPays();
		this.nbr_cuid = nbr_cuid;
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

	public String getNomprenom() {
		return nomprenom;
	}

	public void setNomprenom(String nomprenom) {
		this.nomprenom = nomprenom;
	}

	public String getPays() {
		return pays;
	}

	public void setPays(String pays) {
		this.pays = pays;
	}

	public int getNbr_cuid() {
		return nbr_cuid;
	}

	public void setNbr_cuid(int nbr_cuid) {
		this.nbr_cuid = nbr_cuid;
	}
}
