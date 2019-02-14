// angular
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

//services
import { LocalisationService } from '../../services/http/localisation/localisation.service';

//interfaces 
import {Localisation} from '../../interfaces/Localisation';

//others
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-supprimer-localisation',
  templateUrl: './modal-supprimer-localisation.component.html',
  styleUrls: ['./modal-supprimer-localisation.component.scss']
})
export class ModalSupprimerLocalisationComponent implements OnInit {

  //application: Application;
  tabLocalisation: Localisation[] = [];

  localisation = new FormControl('', [
    Validators.required
  ]);

  constructor(    
    public dialogRef: MatDialogRef<ModalSupprimerLocalisationComponent>,
    private localisationService: LocalisationService,
    ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }
  
    onClick(): void {
      if (this.localisation.value === '')
        swal('Erreur', 'Veuillez saisir un nom d\'application', 'error');
      else {
        this.localisationService.deleteLocalisation(this.localisation.value)
        .subscribe((data: any) => {
          this.tabLocalisation = this.tabLocalisation.filter(item => item.pays != this.localisation.value);
          swal('Erreur', ' Localisation supprimée', 'success');
          this.dialogRef.close(this.tabLocalisation);
        }, (err) => {
            swal('Erreur', ' Localisation non supprimée ', 'error');
        });   
      }
    }

  ngOnInit() {
    this.localisationService.getLocalisations()
    .subscribe((data: any) => {
        this.tabLocalisation = data;
    });
  }
}
