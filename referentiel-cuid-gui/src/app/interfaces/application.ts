import {Contrat} from '../interfaces/Contrat';

export interface Application {
    id: number;
    nomApplication: String;
    utiliser: boolean;
    contrat: Contrat;
}
