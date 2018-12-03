import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl, ValidatorFn} from '@angular/forms';
import { CollaborateurService } from '../services/collaborateurs/collaborateur.service';
import{ActivatedRoute} from '@angular/router'
import { LocalisationService } from '../services/localisation/localisation.service';

CollaborateurService
export interface Collaborateur {
	trigrame: String;
  role: String;
  mdp: String;
  nom: String;
  prenom: String;
  localisation:{
    id: Number;
    pays: String;
  },
  statusCollaborateur: Number;
}

export interface Localisation {

  id: Number;
  pays: String
}


@Component({
  selector: 'app-fiche-collaborateur',
  templateUrl: './fiche-collaborateur.component.html',
  styleUrls: ['./fiche-collaborateur.component.scss']
})
export class FicheCollaborateurComponent implements OnInit {

  trigramCollab;
  collaborateur: Collaborateur[] = [];
  localisations: Localisation[] = [];

  hello: boolean = false;

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
              private localisationService: LocalisationService) { }

  ngOnInit() {

    this.trigramCollab = this.route.snapshot.params['trigrame'];

    this.collaborateurService.getCollab(this.trigramCollab)
    .subscribe((data: any) => {
        this.collaborateur = data;
        console.log(this.collaborateur);

        this.collabForm.get("nom").setValue(data.nom);
        this.collabForm.get("prenom").setValue(data.prenom);
        this.collabForm.get("localisation").setValue(data.localisation.pays);
        this.collabForm.get("role").setValue(data.role); 
    });

    this.localisationService.getLocalisations()
    .subscribe((data: any) => {
        this.localisations = data;
        console.log(this.localisations);
    });

    this.collaborateurService.getCuids(this.trigramCollab)
    .subscribe((data: any) => {
        this.localisations = data;
        console.log(this.localisations);
    });
  }

  saveCollab(){

    this.hello = true;
  }
}
