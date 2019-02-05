import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AffectationService {

  constructor(private http: HttpClient) { }

  getAffectations = () => {
    return this.http.get(`${environment.url}/CuidCollaborateur`);
  }

  getAffectationCollab = (trigrame: any) => {
      return this.http.get(`${environment.url}/CuidCollaborateur/collaborateur/${trigrame}`);
  }

  getAffectationCuid = (cuid: any) => {
      return this.http.get(`${environment.url}/CuidCollaborateur/cuid/${cuid}`);
  }

  getAffectationTab = () => {
    return this.http.get(`${environment.url}/TabAffectation`);
}

  addAffectation = (collab: any) => {
      return this.http.post(`${environment.url}/CuidCollaborateur`, collab);
  }

  updateAffectation = (collab: any) => {
      return this.http.put(`${environment.url}/CuidCollaborateur`, collab);
  }

  deleteAffectation = (collab: any) => {
      return this.http.delete(`${environment.url}/CuidCollaborateur`, collab)
  }
}
