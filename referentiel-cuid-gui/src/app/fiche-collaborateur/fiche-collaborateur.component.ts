//angular
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl, ValidatorFn} from '@angular/forms';
import{ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

//services
import { CollaborateurService } from '../services/http/collaborateurs/collaborateur.service';

//interfaces 
import { Collaborateur } from '../interfaces/collaborateur';
import { Localisation } from '../interfaces/localisation';

//others 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fiche-collaborateur',
  templateUrl: './fiche-collaborateur.component.html',
  styleUrls: ['./fiche-collaborateur.component.scss']
})
export class FicheCollaborateurComponent implements OnInit {

  trigramCollab;
  collaborateur: Collaborateur[] = [];
  localisations: Localisation[] = [];
  collabForm = new FormGroup({
    nom : new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$')
    ]),  
    prenom : new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    localisation : new FormControl({value: '', disabled: true}, [
      Validators.required,
    ]),
    role : new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    password : new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(5),
    ]),
    passwordVerif : new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(5)
    ]),
  });

  constructor(private collaborateurService: CollaborateurService,
              private route: ActivatedRoute,
              private router: Router,) { }

  ngOnInit() {
    this.trigramCollab = this.route.snapshot.params['trigrame'];
    this.collaborateurService.getCollaborateur(this.trigramCollab)
    .subscribe((data: any) => {
      this.collaborateur = data;
      this.collabForm.get("nom").setValue(data.nom);
      this.collabForm.get("prenom").setValue(data.prenom);
      this.collabForm.get("localisation").setValue(data.localisation.pays);
      this.collabForm.get("role").setValue(data.role); 
    }, (err) => {

      if(err.status == "404"){
        Swal.fire(
          'Erreur 404',
          'Ce collaborateur est introuvable',
          'error'
        )
        this.router.navigateByUrl('/tabCollaborateur');
      }
    });
  }

  saveCollab(){  
  }
}
