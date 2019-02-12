import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ContratService {

    constructor(private http: HttpClient) { }

    getContrats = () => {
        return this.http.get(`${environment.url}/Contrat`);
    }

    getContrat = (contrat: any) => {
        return this.http.get(`${environment.url}/Contrat/${contrat}`);
    }

    getContratByName = (nom: any) => {
        return this.http.get(`${environment.url}/ContratByName/${nom}`);
    }

    addContrat = (contrat: any) => {
        return this.http.post(`${environment.url}/Contrat`, contrat);
    }

    updateContrat = (contrat: any) => {
        return this.http.put(`${environment.url}/Contrat`, contrat);
    }

    deleteContrat = (contrat: any) => {
        return this.http.delete(`${environment.url}/Contrat`, contrat);
    }
    
}
