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
  selector: 'app-modal-supprimer-application',
  templateUrl: './modal-supprimer-application.component.html',
  styleUrls: ['./modal-supprimer-application.component.scss']
})
export class ModalSupprimerApplicationComponent implements OnInit {

  applications: Application[] = [];
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
    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onClick(): void {

      if (this.contrat.value === '')
        swal('Erreur', 'Veuillez saisir un nom de contrat', 'error');

      else if (this.application.value === '')
        swal('Erreur', 'Veuillez saisir un nom d\'application', 'error');

      else {
        
        this.applications.forEach(element => {
          if(element.id == this.application.value)
            this.applications.push(element);
        });

        this.applicationService.addApplication(this.application)
        .subscribe((data: any) => {
  
        this.dialogRef.close(this.applications);
        
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
}


