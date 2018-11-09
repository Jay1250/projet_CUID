import { Injectable } from '@angular/core';
import { HttpClient } from '../../../../node_modules/@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ApplicationService {

	constructor(
		private http: HttpClient

	) { }

	getApplication = () => {
		return this.http.get(`${environment.url}/application`);
	}
}



