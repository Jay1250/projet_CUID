import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'

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

    addLocalisation = (local: any) => {
        return this.http.post(`${environment.url}/Localisation`, local);
    }
}
