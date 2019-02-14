import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../../node_modules/@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApplicationService {

	constructor(
		private http: HttpClient
	) { }

	getApplications = () => {
		return this.http.get(`${environment.url}/Application`);
	}

	getApplication = (app: any) => {
		return this.http.get(`${environment.url}/Application/${app}`);
	}

	addApplication = (app: any) => {
        return this.http.post(`${environment.url}/Application`, app);
	}
	
	updateApplication = (app: any) => {
        return this.http.put(`${environment.url}/Application`, app);
	}
	
	deleteApplication = (id: any) => {
        return this.http.delete(`${environment.url}/Application/${id}`, id);
    }
}