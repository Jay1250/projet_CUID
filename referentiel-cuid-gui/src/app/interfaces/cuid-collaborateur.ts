import { Cuid } from "../interfaces/cuid";
import { Collaborateur } from "../interfaces/collaborateur";

export interface CuidCollaborateur {
    cuid: Cuid;
    collaborateur: Collaborateur
    dateaffectation: String;
    dateliberation: String;
}
