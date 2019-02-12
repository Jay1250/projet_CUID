//angular
import { Component, OnInit } from '@angular/core';

//services
import {CookieService} from 'ngx-cookie-service';

//interfaces
import { Contrat } from './interfaces/contrat';
import { ContratService } from './services/http/contrat/contrat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private cookieService: CookieService){}

ngOnInit(): void {

  this.cookieService.set( 'Contrat', 'tous' );
}
}
