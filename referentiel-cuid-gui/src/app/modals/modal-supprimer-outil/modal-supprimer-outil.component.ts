// angular
import {MatDialogRef} from '@angular/material';
import {FormControl, Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

//services
import { OutilService } from '../../services/http/outil/outil.service';

//interfaces 
import {Outil} from '../../interfaces/Outil';

//others
import swal from 'sweetalert2';

@Component({
  selector: 'app-modal-supprimer-outil',
  templateUrl: './modal-supprimer-outil.component.html',
  styleUrls: ['./modal-supprimer-outil.component.scss']
})
export class ModalSupprimerOutilComponent implements OnInit {

  //application: Application;
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
        swal('Erreur', 'Veuillez saisir un nom d\'application', 'error');
      else {
        console.log(this.outil.value);
        this.outilService.deleteOutil(this.outil.value)
        .subscribe((data: any) => {
          this.tabOutil = this.tabOutil.filter(item => item.nomOutil != this.outil.value);
          swal('Erreur', ' Outil supprimée', 'success');
          this.dialogRef.close(this.tabOutil);
        }, (err) => {
            swal('Erreur', ' outil non supprimée ', 'error');
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