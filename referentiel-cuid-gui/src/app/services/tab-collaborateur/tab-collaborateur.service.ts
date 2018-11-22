import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TabCollaborateurService {

  constructor(private http: HttpClient) { }

  getAllTabCuid = () => {
		return this.http.get(`${environment.url}/CollaborateurInfos`);
	}
}
