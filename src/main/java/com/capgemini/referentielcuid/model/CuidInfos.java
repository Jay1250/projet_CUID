package com.capgemini.referentielcuid.model;

public class CuidInfos {

	private String cuid;
	
	private String nomprenom;
	
	private int status;
	
	private String commentaires;
	
	private String manager;
	
	private String contrat;
	
	private int nbcollab;

	private int nbapplis;
	
	public CuidInfos() {
	}
	
	public CuidInfos(Cuid cuid, int nbcollab, int nbapplis) {
		super();
		this.cuid = cuid.getCuid();
		this.nomprenom = cuid.getNom() + " " + cuid.getPrenom();
		this.status = cuid.getStatus();
		this.commentaires = cuid.getCommentaires();
		this.manager = cuid.getNomgir() + " " + cuid.getPrenomgir();
		this.contrat = cuid.getContrat().getNom();
		this.nbcollab = nbcollab;
		this.nbapplis = nbapplis;
	}

	public String getCuid() {
		return cuid;
	}

	public void setCuidId(String cuid) {
		this.cuid = cuid;
	}

	public String getNomprenom() {
		return nomprenom;
	}

	public void setNomprenom(String nomprenom) {
		this.nomprenom = nomprenom;
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

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getContrat() {
		return contrat;
	}

	public void setContrat(String contrat) {
		this.contrat = contrat;
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
