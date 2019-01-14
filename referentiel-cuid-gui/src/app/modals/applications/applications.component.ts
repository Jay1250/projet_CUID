import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { ApplicationService } from '../../services/http/application/application.service';
import { ContratService } from '../../services/http/contrat/contrat.service';
import swal from 'sweetalert2';
import {FormControl, Validators} from '@angular/forms';


// POST
export interface Application {
  nomApplication: String;
  contrat: Contrat;
}
export interface Contrat{
  id: number;
}

//GET
export interface tabApplication {
  id: number;
  nomApplication: String;
  contrat: tabContrat;
}

export interface tabContrat {
	id: number;
  nom: String;
}


@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss']
})
export class ApplicationsModalComponent implements OnInit {

  application: Application;
  tabApplication: tabApplication[] = [];
  tabContrat: tabContrat[] = [];

  nomApp = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  contrat = new FormControl('', [
    Validators.required,
  ]);

  constructor(    
    public dialogRef: MatDialogRef<ApplicationsModalComponent>,
    private applicationService: ApplicationService,
    private contratService: ContratService,
    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onClick(): void {

      if(!this.estNewApp(this.nomApp.value))
        swal('Erreur', ' Cette Application existe déjà ', 'error');
      
      else if(this.nomApp.value !== '' && this.contrat.value !== ''){

        this.application = {nomApplication: this.nomApp.value,
                            contrat:{
                              id : this.contrat.value
                            } 
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
      else if(this.contrat.value === '')
        swal('Erreur', 'Veuillez saisir un nom de contrat', 'error');

      else
        swal('Erreur', 'Veuillez saisir un nom d\'application', 'error');
     
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
