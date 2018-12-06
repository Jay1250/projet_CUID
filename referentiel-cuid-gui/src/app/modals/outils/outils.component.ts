import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { OutilService } from '../../services/outil/outil.service';
import swal from 'sweetalert2';
import {FormControl, Validators} from '@angular/forms';

export interface Outil {
  nomOutil: String;
}

export interface tabOutil {
	id: number;
  nomOutil: String;
  utiliser: boolean;
}

@Component({
  selector: 'app-outils',
  templateUrl: './outils.component.html',
  styleUrls: ['./outils.component.scss']
})
export class OutilsModalComponent implements OnInit {

  outils: Outil;
  tabOutils: tabOutil[] = [];
 

  nomOutil = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  constructor(
    public dialogRef: MatDialogRef<OutilsModalComponent>,
    private outilService: OutilService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClick(): void {

    if(!this.estNewOutil(this.nomOutil))
      swal('Erreur', ' Cet Outil existe déjà ', 'error');
    
    else if(this.nomOutil !== null && this.nomOutil !== undefined && this.nomOutil.value !== ''){

      this.outils = {nomOutil: this.nomOutil.value};

      this.outilService.addOutil(this.outils)
      .subscribe((data: any) => {

          swal('Outil bien ajouté', '', 'success');
          this.outilService.getOutil()
          .subscribe((data: any) => {
              this.tabOutils = data;
              this.dialogRef.close(this.tabOutils);
          });
      
      }, (err) => {
          swal('Erreur', ' Outil non ajouté ', 'error');
      });   
    }
    else
      swal('Erreur', 'Veuillez saisir un nom d\'outil', 'error');
  }


  ngOnInit() {

    this.outilService.getOutil()
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
