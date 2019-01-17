//angular
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {FormControl} from '@angular/forms';

//services
import { ContratService } from '../services/http/contrat/contrat.service';
import { CuidService } from '../services/http/cuid/cuid.service';

//interfaces
import {Cuid} from '../interfaces/cuid';
import {Contrat} from '../interfaces/contrat';
import {CuidInfo} from '../interfaces/cuid-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  contrats: Contrat[] = [];
  cuids: CuidInfo[] = [];

  name = 'tous';

  cuidNonAffect: Number = 0;
  cuidUnCollab: Number = 0;
  cuidPlusieursCollab: Number = 0;

  constructor(
    private contratService: ContratService,
    private cuidService: CuidService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.contratService.getContrats()
    .subscribe((data: any) => {
        this.contrats = data;
    });

    this.cuidService.getTabCuid()
    .subscribe((data: any) => {
        this.cuids = data;

        console.log(this.cuids);
    });
  }

  chgContrat(){

   // console.log(this.panelColor.value);
  // console.log(this.name);
  }

  nbrCuid(): number{
    let nbr: number = 0;
    this.cuidNonAffect = 0;
    this.cuidUnCollab = 0;
    this.cuidPlusieursCollab = 0;
    if(this.name == "tous")
      nbr = this.cuids.length;
    else{
      this.cuids.forEach(function(element){
      //  console.log(element.contrat);
        
        if(element.cuid.contrat.nom == this.name){
         // console.log(element.contrat);
          if(element.nbcollab == 0) this.cuidNonAffect++;
          else if(element.nbcollab == 1) this.cuidUnCollab++;
          else if(element.nbcollab > 1) this.cuidPlusieursCollab++;
          nbr++;
        
        } 
      }, this);
    //  this.cdRef.detectChanges();
    }
    return nbr;
  }
}
