import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreationCuidService {

  constructor(private http: HttpClient) { }

  getAllOutils = () => {
		return this.http.get(`${environment.url}/Outil`);
  }
  
  getAllApplications = () => {
		return this.http.get(`${environment.url}/Application`);
  }
  
  getAllContrats = () => {
		return this.http.get(`${environment.url}/Contrat`);
  }
  
  addCuid = (cuid: any) => {
    return this.http.post(`${environment.url}/Cuid`, cuid);
}

}
