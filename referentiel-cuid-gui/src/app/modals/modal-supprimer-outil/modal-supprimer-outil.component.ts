// angular
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

//services
import { OutilService } from '../../services/http/outil/outil.service';

//interfaces 
import {Outil} from '../../interfaces/Outil';

//others
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-supprimer-outil',
  templateUrl: './modal-supprimer-outil.component.html',
  styleUrls: ['./modal-supprimer-outil.component.scss']
})

export class ModalSupprimerOutilComponent implements OnInit {

  tabOutil: Outil[] = [];
  outil = new FormControl('', [
    Validators.required
  ]);

  constructor(    
    public dialogRef: MatDialogRef<ModalSupprimerOutilComponent>,
    private outilService: OutilService,
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onClick(): void {
    if (this.outil.value === '')
      Swal.fire(
        'Erreur',
        'Veuillez saisir un nom d\'application',
        'error'
      )
    else {
      this.outilService.deleteOutil(this.outil.value)
      .subscribe((data: any) => {
        this.tabOutil = this.tabOutil.filter(item => item.nomOutil != this.outil.value);
        Swal.fire(
          'Succès',
          'Outil supprimée',
          'success'
        )
        this.dialogRef.close(this.tabOutil);
      }, (err) => {
        Swal.fire(
          'Erreur',
          'Outil non supprimée',
          'error'
        )
      });   
    }
  }

  ngOnInit() {
    this.outilService.getOutils()
    .subscribe((data: any) => {
      this.tabOutil = data;
    });
  }
}