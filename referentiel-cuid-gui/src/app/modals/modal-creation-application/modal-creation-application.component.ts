// angular
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

//services
import { ApplicationService } from '../../services/http/application/application.service';
import { ContratService } from '../../services/http/contrat/contrat.service';

//interfaces 
import {Application} from '../../interfaces/Application';
import {Contrat} from '../../interfaces/Contrat'

//others
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-creation-application',
  templateUrl: './modal-creation-application.component.html',
  styleUrls: ['./modal-creation-application.component.scss']
})
export class ModalCreationApplicationComponent implements OnInit {

  application: Application;
  tabApplication: Application[] = [];
  tabContrat: Contrat[] = [];

  nomApp = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  contrat = new FormControl('', [
    Validators.required,
  ]);

  constructor(    
    public dialogRef: MatDialogRef<ModalCreationApplicationComponent>,
    private applicationService: ApplicationService,
    private contratService: ContratService,
    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onClick(): void {

      if(!this.estNewApp(this.nomApp.value))
        swal('Erreur', ' Cette Application existe déjà ', 'error');

      else if (this.contrat.value === '')
        swal('Erreur', 'Veuillez saisir un nom de contrat', 'error');

      else if (this.nomApp.value === '')
        swal('Erreur', 'Veuillez saisir un nom d\'application', 'error');

      else {
        
        this.application = {
                            id: null,
                            nomApplication: this.nomApp.value,
                            utiliser: null,
                            // à voir
                            contrat: this.contrat.value
                            }; 

        this.applicationService.addApplication(this.application)
        .subscribe((data: any) => {
  
            swal('Application bien ajoutée', '', 'success');
            this.applicationService.getApplications()
            .subscribe((data: any) => {
                this.tabApplication = data;
                this.dialogRef.close(this.tabApplication);
            });
        
        }, (err) => {
            swal('Erreur', ' Appplication non ajoutée ', 'error');
        });   
      }
    }

  ngOnInit() {

    this.applicationService.getApplications()
    .subscribe((data: any) => {
        this.tabApplication = data;
    });

    this.contratService.getContrats()
    .subscribe((data: any) => {
        this.tabContrat = data;
    });
  }

  estNewApp(valeur): boolean{

    let estNew = true;
    this.tabApplication.forEach(function(element){
      if(valeur == element.nomApplication)
        estNew = false; 
    });
    return estNew;
  }
}
