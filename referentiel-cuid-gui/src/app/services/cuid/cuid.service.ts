import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CuidService {

    constructor(private http: HttpClient) { }

    getAllCuid = () => {
      return this.http.get(`${environment.url}/Cuid`);
    }

    findByNomOrPrenom = (nom: String, prenom: String) => {
        return this.http.get(`${environment.url}/Cuid/_search?nom=${nom}&prenom=${prenom}`);
    }

    findById = (id: String) => {
        return this.http.get(`${environment.url}/Cuid/${id}`);
    }

    addCuid = (cuid: any) => {
        return this.http.post(`${environment.url}/Cuid`, cuid);
    }

    delete = (cuid: String) => {
        return this.http.delete(`${environment.url}/Cuid/${cuid}`)
    }

    update = (cuid: any) => {
        return this.http.put(`${environment.url}/Cuid`, cuid);
    }

    recupCollaborateurs = (cuid: String) => {
        return this.http.get(`${environment.url}/CollaborateursCuid/${cuid}`);
    }

    recupInfosCuid = () => {
        return this.http.get(`${environment.url}/CuidInfos`);
    }
}