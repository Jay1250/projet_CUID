import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class TabCuidService {

constructor(private http: HttpClient) { }

	getAllTabCuid = () => {
		return this.http.get(`${environment.url}/CuidInfos`);
	}
/*
	findByCuid = (nom: String, prenom: String) => {
		return this.http.get(`${environment.url}/cuid/_search?nom=${nom}&prenom=${prenom}`);
	}
*/
}
