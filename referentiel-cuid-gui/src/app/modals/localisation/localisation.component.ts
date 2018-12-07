import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { LocalisationService } from '../../services/localisation/localisation.service';
import swal from 'sweetalert2';
import {FormControl, Validators} from '@angular/forms';

export interface Localisation {
  pays: String;
}

export interface tabLocalisation {
	id: number;
  pays: String;
}

@Component({
  selector: 'app-localisation',
  templateUrl: './localisation.component.html',
  styleUrls: ['./localisation.component.scss']
})
export class LocalisationModalComponent implements OnInit {

  localisation: Localisation;
  localisations: tabLocalisation[] = [];
  //nomLocalisation: String;

  nomLocalisation = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  constructor(
    public dialogRef: MatDialogRef<LocalisationModalComponent>,
    private localisationService: LocalisationService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {

    if(!this.estNewLocalisation(this.nomLocalisation))
      swal('Erreur', ' Cet Outil existe déjà ', 'error');
    
    else if(this.nomLocalisation !== null && this.nomLocalisation !== undefined && this.nomLocalisation.value !== ''){

      this.localisation = {pays: this.nomLocalisation.value};

      console.log(this.localisation);

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
      if(valeur == element.pays)
        estNew = false; 
    });
    return estNew;
  }
}
