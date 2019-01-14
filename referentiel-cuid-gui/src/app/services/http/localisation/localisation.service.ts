import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class LocalisationService {

    constructor(
        private http: HttpClient
    ) { }

    getLocalisations = () => {
        return this.http.get(`${environment.url}/Localisation`);
    }

    getLocalisation = (local: any) => {
        return this.http.get(`${environment.url}/Localisation${local}`);
    }

    addLocalisation = (local: any) => {
        return this.http.post(`${environment.url}/Localisation`, local);
    }

    updateLocalisation = (local: any) => {
        return this.http.put(`${environment.url}/Localisation`, local);
    }

    deleteLocalisation = (local: any) => {
        return this.http.delete(`${environment.url}/Localisation`, local);
    }
}
