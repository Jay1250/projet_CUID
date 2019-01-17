import { Localisation } from "../interfaces/localisation";

export interface Collaborateur {
	trigrame: String;
	role: String;
	mdp: String;
	nom: String;
	prenom: String;
	localisations: Localisation;
}
