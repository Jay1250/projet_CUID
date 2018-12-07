import { Component, OnInit } from '@angular/core';
import { ContratService } from '../services/contrat/contrat.service';
import { CuidService } from '../services/cuid/cuid.service';

export interface Contrat {
	id: number;
  nom: String;
}

export interface Cuid {
	cuid: String;
  nom: String;
  prenom: String;
  mdp: String;
  status: number;
	commentaires: String;
	nomgir: String;
	prenomgir: String;
  contrat: Contrat;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contrats: Contrat[] = [];
  cuids: Cuid[] = [];

  constructor(
    private contratService: ContratService,
    private cuidService: CuidService
  ) { }

  ngOnInit() {

    this.contratService.getAllContrats()
    .subscribe((data: any) => {
        this.contrats = data;
    });

    this.cuidService.getAllCuid()
    .subscribe((data: any) => {
        this.cuids = data;
      
    });
  }

  chgContrat(){

    
  }
}
