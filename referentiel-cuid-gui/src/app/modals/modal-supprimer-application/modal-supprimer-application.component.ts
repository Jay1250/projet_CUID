// angular
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

//services
import { ApplicationService } from '../../services/http/application/application.service';
import { ContratService } from '../../services/http/contrat/contrat.service';
import {CuidService} from '../../services/http/cuid/cuid.service';
import { CookieService } from 'ngx-cookie-service';

//interfaces 
import {Application} from '../../interfaces/Application';
import {Contrat} from '../../interfaces/Contrat'

//others
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-supprimer-application',
  templateUrl: './modal-supprimer-application.component.html',
  styleUrls: ['./modal-supprimer-application.component.scss']
})

export class ModalSupprimerApplicationComponent implements OnInit {

  //application: Application;
  tabApplication: Application[] = [];
  tabContrat: Contrat[] = [];
  application = new FormControl('', [
    Validators.required
  ]);
  contrat = new FormControl('', [
    Validators.required,
  ]);

  constructor(    
    public dialogRef: MatDialogRef<ModalSupprimerApplicationComponent>,
    private applicationService: ApplicationService,
    private contratService: ContratService,
    private cookieService: CookieService,
    private cuidService: CuidService
    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onClick(): void {
      if (this.contrat.value === '')
        Swal.fire(
          'Erreur',
          'Veuillez saisir un nom de contrat',
          'error'
        )
      else if (this.application.value === '')
        Swal.fire(
          'Erreur',
          'Veuillez saisir un nom d\'application',
          'error'
        )
      else {
        Swal.fire({
          title: 'Attention',
          text: "Etes-vous sûr de vouloir supprimer cette application ? (cette application sera supprimée des cuids qui l'utilisent)",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Supprimer'
        }).then((result) => {
          if (result.value) {
            this.applicationService.deleteApplication(this.application.value)
            .subscribe((data: any) => {
              this.tabApplication = this.tabApplication.filter(item => item.nomApplication != this.application.value);
                Swal.fire(
                  'Succès',
                  'Appplication supprimée',
                  'success'
                )
              this.dialogRef.close(this.application.value);
            }, (err) => {
              Swal.fire(
                'Erreur',
                'Appplication non supprimée',
                'error'
              )
            }); 
          }
        })
      }
    }

  ngOnInit() {
    if(this.cookieService.get('Contrat') != 'tous'){
      this.contratService.getContratByName(this.cookieService.get('Contrat'))
      .subscribe((data: any) => {
        this.contrat.setValue(data.id.toString());
      });
    }
    this.applicationService.getApplications()
    .subscribe((data: any) => {
      this.tabApplication = data;
      if(this.cookieService.get('Contrat') != 'tous')
        this.tabApplication = this.tabApplication.filter(element => element.contrat.nom == this.cookieService.get('Contrat'));
    });
    this.contratService.getContrats()
    .subscribe((data: any) => {
      this.tabContrat = data;
    });
  }

  changeContrat(){
    this.tabApplication = [];
    this.applicationService.getApplications()
    .subscribe((data: any) => {
      this.tabApplication = data;
      if(this.contrat)
        this.tabApplication = this.tabApplication.filter(element => element.contrat.id == this.contrat.value);
    });
  }
}