//angular
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';

//services
import { ContratService } from '../services/contrat/contrat.service';
import { ApplicationService } from '../services/application/application.service';
import { OutilService } from '../services/outil/outil.service';
import { LocalisationService } from '../services/localisation/localisation.service';
import {FormStateMatcherService} from '../services/form-state-matcher/form-state-matcher.service'

//components
import { OutilsModalComponent } from '../modals/outils/outils.component';
import { ApplicationsModalComponent } from '../modals/applications/applications.component';
import { LocalisationModalComponent } from '../modals/localisation/localisation.component';

//interfaces
import {Contrat} from '../interfaces/contrat';
import {Application} from '../interfaces/application';
import {Outil} from '../interfaces/outil';
import {Localisation} from '../interfaces/localisation';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.scss']
})
export class GestionComponent implements OnInit {

  contrats: Contrat[] = [];
  applications: Application[] = [];
  outils: Outil[] = [];
  localisations: Localisation[] = [];
  matcher = new FormStateMatcherService();

  displayedColumnsOutils: string[] = ['id', 'nomOutil'];
  dataSourceOutils;

  appliForm = new FormGroup({

    appli : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    contrat : new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private contratService: ContratService,
    private applicationService: ApplicationService,
    private outilService: OutilService,
    private localisationService: LocalisationService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.contratService.getAllContrats()
    .subscribe((data: any) => {
        this.contrats = data;
    });

    this.outilService.getOutil()
    .subscribe((data: any) => {
        this.outils = data;
        this.dataSourceOutils = data;
    });

    this.localisationService.getLocalisations()
    .subscribe((data: any) => {
        this.localisations = data;
    });

    this.applicationService.getApplication()
    .subscribe((data: any) => {
        this.applications = data;
        this.applications.forEach(function(application){
          application.utiliser = false;
       })
       console.log(this.applications)
    });
  }

  appliSubmit(){

    console.log(this.appliForm.get('appli').value);
    console.log(this.appliForm.get('contrat').value);

  }

  openDialogOutil(): void {
    const dialogRef = this.dialog.open(OutilsModalComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
     
      if(result !== null && result !== undefined)
        this.outils = result;
    });
  }

  openDialogApp(): void {
    const dialogRef = this.dialog.open(ApplicationsModalComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
     
    if(result !== null && result !== undefined)
      this.applications = result;
    });
  }

  openDialogLocalisation(): void {
    const dialogRef = this.dialog.open(LocalisationModalComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
     
      if(result !== null && result !== undefined)
        this.localisations = result;
    });
  }

}
