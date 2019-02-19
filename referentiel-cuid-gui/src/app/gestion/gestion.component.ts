//angular
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material';

//services
import { ContratService } from '../services/http/contrat/contrat.service';
import { ApplicationService } from '../services/http/application/application.service';
import { OutilService } from '../services/http/outil/outil.service';
import { LocalisationService } from '../services/http/localisation/localisation.service';
import {FormStateMatcherService} from '../services/form-state-matcher/form-state-matcher.service'

//components

import { ModalCreationApplicationComponent } from '../modals/modal-creation-application/modal-creation-application.component';
import { ModalCreationLocalisationComponent } from '../modals/modal-creation-localisation/modal-creation-localisation.component';
import { ModalCreationOutilComponent } from '../modals/modal-creation-outil/modal-creation-outil.component';

import { ModalSupprimerApplicationComponent } from '../modals/modal-supprimer-application/modal-supprimer-application.component';
import { ModalSupprimerLocalisationComponent } from '../modals/modal-supprimer-localisation/modal-supprimer-localisation.component';
import { ModalSupprimerOutilComponent } from '../modals/modal-supprimer-outil/modal-supprimer-outil.component';

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

  // data
  contrats: Contrat[] = [];
  applications: Application[] = [];
  outils: Outil[] = [];
  localisations: Localisation[] = [];

  constructor(
    private contratService: ContratService,
    private applicationService: ApplicationService,
    private outilService: OutilService,
    private localisationService: LocalisationService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.contratService.getContrats()
    .subscribe((data: any) => {
        this.contrats = data;
    });

    this.outilService.getOutils()
    .subscribe((data: any) => {
        this.outils = data;
    });

    this.localisationService.getLocalisations()
    .subscribe((data: any) => {
        this.localisations = data;
    });

    this.applicationService.getApplications()
    .subscribe((data: any) => {
        this.applications = data;
    });
  }

  //***** modal
  //outil
  openDialogCreationOutil(): void {
    const dialogRef = this.dialog.open(ModalCreationOutilComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
      if(result !== null && result !== undefined)
        this.outils = result;
    });
  }

  openDialogSupprimerOutil(): void {
    const dialogRef = this.dialog.open(ModalSupprimerOutilComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
      this.outilService.getOutils()
      .subscribe((data: any) => {
          this.outils = data;
      });
    });
  }

  //app
  openDialogCreationApp(): void {
    const dialogRef = this.dialog.open(ModalCreationApplicationComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
    if(result !== null && result !== undefined)
      this.applications = result;
    });
  }

  openDialogSupprimerApp(): void {
    const dialogRef = this.dialog.open(ModalSupprimerApplicationComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
      this.applicationService.getApplications()
      .subscribe((data: any) => {
          this.applications = data;
      });
    });
  }

  // localisation
  openDialogCreationLocalisation(): void {
    const dialogRef = this.dialog.open(ModalCreationLocalisationComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
      if(result !== null && result !== undefined)
        this.localisations = result;
    });
  }

  openDialogSupprimerLocalisation(): void {
    const dialogRef = this.dialog.open(ModalSupprimerLocalisationComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
      if(result !== null && result !== undefined)
        this.applications = result;
    });
  }
}