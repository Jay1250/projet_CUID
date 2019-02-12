import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class CuidService {

    constructor(private http: HttpClient) { }

    getCuids = () => {
      return this.http.get(`${environment.url}/Cuid`);
    }

    getCuid = (id: String) => {
        return this.http.get(`${environment.url}/Cuid/${id}`);
    }

    getTabCuid = () => {
        return this.http.get(`${environment.url}/TabCuids`);
    }

    getTabCuidByContrat = (contratNom: any) => {
        return this.http.get(`${environment.url}/TabCuids/${contratNom}`, contratNom);
    }

    addCuid = (cuid: any) => {
        return this.http.post(`${environment.url}/Cuid`, cuid);
    }

    updateCuid = (cuid: any) => {
        return this.http.put(`${environment.url}/Cuid`, cuid);
    }

    deleteCuid = (cuid: any) => {
        return this.http.delete(`${environment.url}/Cuid`, cuid)
    }
}