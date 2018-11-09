import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CollaborateurService {

    constructor(private http: HttpClient) { }

    getAllCollabs = () => {
        return this.http.get(`${environment.url}/collaborateur`);
    }


    findByNomOrPrenom = (nom: String, prenom: String) => {
        return this.http.get(`${environment.url}/collaborateur/_search?nom=${nom}&prenom=${prenom}`);
    }

    addCollab = (collab: any) => {
        return this.http.post(`${environment.url}/collaborateur`, collab);
    }

    delete = (collab: String) => {
        return this.http.delete(`${environment.url}/collaborateur/${collab}`)
    }

    
}
