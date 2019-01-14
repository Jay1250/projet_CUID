import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CollaborateurService {

    constructor(private http: HttpClient) { }

    getCollaborateurs = () => {
        return this.http.get(`${environment.url}/Collaborateur`);
    }

    getCollaborateur = (collab: any) => {
        return this.http.get(`${environment.url}/Collaborateur/${collab}`);
    }

    getTabCollaborateur = () => {
        return this.http.get(`${environment.url}/TabCollaborateur`);
    }

    addCollaborateur = (collab: any) => {
        return this.http.post(`${environment.url}/Collaborateur`, collab);
    }

    updateCollaborateur = (collab: any) => {
        return this.http.put(`${environment.url}/Collaborateur`, collab);
    }

    deleteCollaborateur = (collab: String) => {
        return this.http.delete(`${environment.url}/collaborateur/${collab}`)
    }
}
