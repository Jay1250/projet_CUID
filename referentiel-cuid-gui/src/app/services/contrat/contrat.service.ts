import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ContratService {

    constructor(private http: HttpClient) { }

    getAllContrats = () => {
        return this.http.get(`${environment.url}/Contrat`);
    }
    
}
