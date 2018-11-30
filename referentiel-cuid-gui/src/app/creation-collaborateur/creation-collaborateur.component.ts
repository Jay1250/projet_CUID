import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl, ValidatorFn} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CollaborateurService } from '../services/collaborateurs/collaborateur.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { LocalisationService } from '../services/localisation/localisation.service';
import { CuidService } from '../services/cuid/cuid.service';
import swal from 'sweetalert2';


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

export interface Cuid {
	cuid: String;
  nomprenom: String;
  manager: String;
  status: String;
	nbcollab: String;
	contrat: String;
  nbapplis: String;
  utiliser: Boolean
}

export interface Localisation {

  id: Number;
  pays: String
}

export interface CuidCollaborateur{

  cuidcollaborateurId: {
    cuid: String;
    trigrame: String;
  }
  dateaffectation: String;
  dateliberation: String;
}


@Component({
  selector: 'app-creation-collaborateur',
  templateUrl: './creation-collaborateur.component.html',
  styleUrls: ['./creation-collaborateur.component.scss']
})
export class CreationCollaborateurComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectable = true;
  removable = true;
  disable = true;
  dataSource;
  displayedColumns: string[] = ['cuid','contrat', 'nomprenom', 'manager', 'nbcollab', 'nbapplis', 'ajouter'];
  matcher = new MyErrorStateMatcher();

  localisations: Localisation[] = [];
  cuids: Cuid[] = [];
  addCuids: Cuid[] = [];
  collaborateur: Collaborateur;
  tabCuidCollaborateur: CuidCollaborateur;
  chipsCuid: string[] = [];

  collabForm = new FormGroup({

    trigrame : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    nom : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$')
    ]),  
    prenom : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    localisation : new FormControl('', [
      Validators.required,
    ]),
    role : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    password : new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    passwordVerif : new FormControl('', [
      Validators.required,
      Validators.minLength(5)
    ]),
  });




  constructor(
    private collaborateurService: CollaborateurService,
    private localisationService: LocalisationService,
    private cuidService: CuidService
  ) { }

  ngOnInit() {

    this.collabForm.patchValue({
      passwordVerif : new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        this.passwordValidator(this.collabForm.get("password").value)
      ]),
    
    });
  

    this.localisationService.getLocalisations()
    .subscribe((data: any) => {
        this.localisations = data;
        console.log(this.localisations);
    });

    this.cuidService.recupInfosCuid()
    .subscribe((data: any) => {
        this.cuids = data;
        this.cuids.forEach(function(element){
          element.utiliser = false;
       })
      this.dataSource = new MatTableDataSource<Cuid>(this.cuids);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  

  saveCollab(){
/*
    this.collabForm.get("trigrame").value
    this.collabForm.get("nom").value
    this.collabForm.get("prenom").value
    this.collabForm.get("localisation").value
    this.collabForm.get("role").value
    this.collabForm.get("password").value
    this.collabForm.get("passwordVerif").value*/


    this.collabForm.setValue
    this.collaborateur = {

      trigrame: this.collabForm.get("trigrame").value,
      role: this.collabForm.get("role").value,
      mdp: this.collabForm.get("password").value,
      nom: this.collabForm.get("nom").value,
      prenom: this.collabForm.get("prenom").value,
      localisation: this.localisations[0],
      statusCollaborateur: 1
    }

    this.collaborateurService.addCollab(this.collaborateur)
    .subscribe((data: any) => {

     
console.log("hello");
      this.addCuids.forEach(function(element){

        this.tabCuidCollaborateur = {
          cuidcollaborateurId:{
            cuid: "hello",
            trigrame: "hello"
          },
          dateaffectation: "2018-11-09",
          dateliberation: "2018-11-09"
        }

        console.log("hello2");
        console.log("cuid" + this.tabCuidCollaborateur);

        this.affectationsService.addAffectations(this.tabCuidCollaborateur)
        .subscribe((data: any) => {
          swal('Succès', 'Les collaborateurs ont été ajouté', 'success');
        }, (err) => {
          swal('Erreur', 'Problème lors de la création des collaborateurs', 'error');
        }); 
        
      }, this);
      swal('Succès', 'Le collaborateur a bien été crée', 'success');
    }, (err) => {

    switch(err.status){

      case 409:
        swal('Erreur', 'Ce cuid existe déjà', 'error');
        break;
      case 500:
        swal('Erreur', 'Une erreur serveur s\'est produite' , 'error');
        break;
      case 400:
        swal('Erreur', 'Les données du cuid sont incorrects', 'error');
        break;
      case 403:
        swal('Erreur', 'Accès refusé', 'error');
        break;
      case 0:
        swal('Erreur', 'Impossible de se connecter au serveur', 'error');
        break;
      default:
        swal('Erreur', 'Une erreur inconnue s\est produite lors de la création du Cuid', 'error');
    }

    console.log(err);
}); 

console.log(this.collaborateur);


  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ajouterCuid(cuid){

    if(this.chipsCuid.includes(cuid))
      swal('Erreur', 'Ce collaborateur est déjà ajouté', 'error');

    else {
      this.chipsCuid.push(cuid);
      this.addCuids
      this.cuids.forEach(function(element){

      if(element.cuid == cuid){

        element.utiliser = true;
        this.addCuids.push(element.utiliser);
      }
        
      }, this)
    }
  }
  passwordValidator(password: String): ValidatorFn
  {
    return (control: AbstractControl): {[key: string]: boolean} | null => {

      if(control.value != password){
        return {'errorPassword': true};
      }

      return null;
    }
    };
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



