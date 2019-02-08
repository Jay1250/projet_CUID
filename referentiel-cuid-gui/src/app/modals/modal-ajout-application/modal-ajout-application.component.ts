// angular
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

//services
import { ApplicationService } from '../../services/http/application/application.service';

//interfaces 
import {Application} from '../../interfaces/Application';
import {Contrat} from '../../interfaces/Contrat'

//others
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-ajout-application',
  templateUrl: './modal-ajout-application.component.html',
  styleUrls: ['./modal-ajout-application.component.scss']
})
export class ModalAjoutApplicationComponent implements OnInit {

  applications: Application[] = [];
  tabApplication: Application[] = [];

  application = new FormControl('', [
    Validators.required
  ]);

  constructor(    
    public dialogRef: MatDialogRef<ModalAjoutApplicationComponent>,
    private applicationService: ApplicationService,
    @Inject(MAT_DIALOG_DATA) public contratId: Contrat
    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onClick(): void {

      if (this.application.value === '')
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
        data.forEach(element => {
          if(element.id == this.contratId)
            this.tabApplication.push(element);
        });
        this.tabApplication = data;
    });
  }
}

