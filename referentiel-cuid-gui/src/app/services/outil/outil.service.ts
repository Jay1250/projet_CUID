import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class OutilService {

	constructor(
		private http: HttpClient
	) { }

	getOutil = () => {
		return this.http.get(`${environment.url}/Outil`);
	}

	addOutil = (outil: any) => {
        return this.http.post(`${environment.url}/Outil`, outil);
    }

}