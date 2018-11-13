package com.capgemini.referentielcuid.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cuid_infos")
public class CuidInfos {

	
	@Id
	private String cuid;
	
	private String nomprenom;
	private String manager;
	private String status;
	private int nbcollab;
	private String contrat;
	private int nbapplis;
	
	public CuidInfos() {
	}

	public String getCuid() {
		return cuid;
	}

	public void setCuid(String cuid) {
		this.cuid = cuid;
	}

	public String getNomprenom() {
		return nomprenom;
	}

	public void setNomprenom(String nomprenom) {
		this.nomprenom = nomprenom;
	}

	public String getManager() {
		return manager;
	}

	public void setManager(String manager) {
		this.manager = manager;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getNbcollab() {
		return nbcollab;
	}

	public void setNbcollab(int nbcollab) {
		this.nbcollab = nbcollab;
	}

	public String getContrat() {
		return contrat;
	}

	public void setContrat(String contrat) {
		this.contrat = contrat;
	}

	public int getNbapplis() {
		return nbapplis;
	}

	public void setNbapplis(int nbapplis) {
		this.nbapplis = nbapplis;
	}

	@Override
	public String toString() {
		return "CuidInfos [cuid=" + cuid + ", nomprenom=" + nomprenom + ", manager=" + manager + ", status=" + status
				+ ", nbcollab=" + nbcollab + ", contrat=" + contrat + ", nbapplis=" + nbapplis + "]";
	}
}
