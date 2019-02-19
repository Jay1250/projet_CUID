//angular
import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';

//services
import { OutilService } from '../../services/http/outil/outil.service';

//interfaces
import {Outil} from '../../interfaces/outil';

//others
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-ajout-outil',
  templateUrl: './modal-ajout-outil.component.html',
  styleUrls: ['./modal-ajout-outil.component.scss']
})
export class ModalAjoutOutilComponent implements OnInit {

  outils: Outil;
  tabOutils: Outil[] = [];
 
  nomOutil = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(20)
  ]);

  constructor(
    public dialogRef: MatDialogRef<ModalAjoutOutilComponent>,
    private outilService: OutilService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {
    if(!this.estNewOutil(this.nomOutil))
      Swal.fire(
        'Erreur',
        'Cet Outil existe déjà',
        'error'
      )
    else if(this.nomOutil !== null && this.nomOutil !== undefined && this.nomOutil.value !== ''){
      this.outils = {
        id: null,
        nomOutil: this.nomOutil.value,
        utiliser: null
      };
      this.outilService.addOutil(this.outils)
      .subscribe((data: any) => {
        Swal.fire(
          'Succès',
          'Outil bien ajouté',
          'success'
        )
          this.outilService.getOutils()
          .subscribe((data: any) => {
              this.tabOutils = data;
              this.dialogRef.close(this.tabOutils);
          });
      }, (err) => {
        Swal.fire(
          'Erreur',
          'Outil non ajouté',
          'error'
        )
      });   
    }
    else
      Swal.fire(
        'Erreur',
        'Veuillez saisir un nom d\'outil',
        'error'
      )
  }

  ngOnInit() {
    this.outilService.getOutils()
    .subscribe((data: any) => {
        this.tabOutils = data;
    });
  }

  estNewOutil(valeur): boolean{
    let estNew = true;
    this.tabOutils.forEach(function(element){
      if(valeur == element.nomOutil)
        estNew = false; 
    });
    return estNew;
  }
}
