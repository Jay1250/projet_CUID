// angular
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

// services
import { LocalisationService } from '../../services/http/localisation/localisation.service';

// interfaces
import { Localisation } from '../../interfaces/localisation';

// others
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-creation-localisation',
  templateUrl: './modal-creation-localisation.component.html',
  styleUrls: ['./modal-creation-localisation.component.scss']
})

export class ModalCreationLocalisationComponent implements OnInit {

  localisation: Localisation;
  localisations: Localisation[] = [];

  nomLocalisation = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  constructor(
    public dialogRef: MatDialogRef<ModalCreationLocalisationComponent>,
    private localisationService: LocalisationService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if(!this.estNewLocalisation(this.nomLocalisation))
      swal('Erreur', ' Cet Outil existe déjà ', 'error');
    else if(this.nomLocalisation !== null && this.nomLocalisation !== undefined && this.nomLocalisation.value !== ''){
      this.localisation = {
        id: null,
        pays: this.nomLocalisation.value
      };
      this.localisationService.addLocalisation(this.localisation)
      .subscribe((data: any) => {
          swal('La nouvelle localisation a bien été ajouté', '', 'success');
          this.localisationService.getLocalisations()
          .subscribe((data: any) => {
            this.localisations = data;
            this.dialogRef.close(this.localisations);
          });
      }, (err) => {
        swal('Erreur', ' localisation non ajoutée ', 'error');
      });   
    }
    else
      swal('Erreur', 'Veuillez saisir un nom de localisation', 'error');
  }

  ngOnInit() {
    this.localisationService.getLocalisations()
    .subscribe((data: any) => {
      this.localisations = data;
    });
  }

  estNewLocalisation(valeur): boolean{
    let estNew = true;
    this.localisations.forEach(function(element){
      if(valeur == element.pays) estNew = false; 
    });
    return estNew;
  }
}