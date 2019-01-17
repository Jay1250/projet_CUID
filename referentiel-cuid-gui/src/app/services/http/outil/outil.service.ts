// angular
import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class OutilService {

	constructor(
		private http: HttpClient
	) { }

	getOutils = () => {
		return this.http.get(`${environment.url}/Outil`);
	}

	getOutil = (outil: any) => {
		return this.http.get(`${environment.url}/Outil/${outil}`);
	}

	addOutil = (outil: any) => {
        return this.http.post(`${environment.url}/Outil`, outil);
	}
	
	updateOutil = (outil: any) => {
        return this.http.put(`${environment.url}/Outil`, outil);
	}
	
	deleteOutil = (outil: any) => {
        return this.http.delete(`${environment.url}/Outil`, outil);
    }

}