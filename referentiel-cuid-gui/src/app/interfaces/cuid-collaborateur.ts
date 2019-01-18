import { Cuid } from "../interfaces/cuid";
import { Collaborateur } from "../interfaces/collaborateur";

export interface CuidCollaborateur {
    cuid: Cuid;
    collaborateurs: Collaborateur
    dateaffectation: String;
    dateliberation: String;
}
