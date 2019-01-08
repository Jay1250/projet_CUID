//angular
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

//services
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

  name = 'tous';

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

   // console.log(this.panelColor.value);
  // console.log(this.name);
  }

  nbrCuid(): number{

    let nbr: number = 0;
    if(this.name == "tous")
      nbr = this.cuids.length;
    else{
      this.cuids.forEach(function(element){
        if(element.contrat.id == this.name) nbr++;
      }, this);
    }
    return nbr;
  }
}
