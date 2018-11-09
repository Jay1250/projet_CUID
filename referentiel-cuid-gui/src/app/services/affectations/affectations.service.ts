import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AffectationsService {

    constructor(
        private http: HttpClient
    ) { }

    getAffectations = () => {
        return this.http.get(`${environment.url}/cuidcollaborateur`); 
    }

    addAffectations = (cuidcollaborateur: any) => {
        return this.http.post(`${environment.url}/cuidcollaborateur`, cuidcollaborateur);
    }

    deleteAffectation = (cuidcollaborateur: any) => {
        return this.http.delete(`${environment.url}/cuidcollaborateur?cuid=${cuidcollaborateur.cuid}&trigrame=${cuidcollaborateur.trigrame}`);
    }
}
