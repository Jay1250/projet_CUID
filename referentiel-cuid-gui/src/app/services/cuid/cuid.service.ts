import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CuidService {

    constructor(private http: HttpClient) { }

    getAllCuid = () => {
      return this.http.get(`${environment.url}/cuid`);
    }

    findByNomOrPrenom = (nom: String, prenom: String) => {
        return this.http.get(`${environment.url}/cuid/_search?nom=${nom}&prenom=${prenom}`);
    }

    findById = (id: String) => {
        return this.http.get(`${environment.url}/cuid/${id}`);
    }

    addCuid = (cuid: any) => {
        return this.http.post(`${environment.url}/cuid`, cuid);
    }

    delete = (cuid: String) => {
        return this.http.delete(`${environment.url}/cuid/${cuid}`)
    }

    update = (cuid: any) => {
        return this.http.put(`${environment.url}/cuid`, cuid);
    }
}