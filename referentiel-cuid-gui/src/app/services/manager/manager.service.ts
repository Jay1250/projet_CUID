import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(
    private http: HttpClient
  ) { }

  getManager = () => {
    return this.http.get(`${environment.url}/managerGir`);
  }
}

