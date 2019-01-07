import {Contrat} from '../interfaces/contrat';
import {Outil} from '../interfaces/outil';
import {Application} from '../interfaces/application';

export interface Cuid {
    cuid: String;
    nom: String;
    prenom: String;
    mdp: String;
    status: number;
    commentaires: String;
    nomgir: String;
    prenomgir: String;
    contrat: Contrat;
    outil: Outil[];
    applications: Application[];
}
