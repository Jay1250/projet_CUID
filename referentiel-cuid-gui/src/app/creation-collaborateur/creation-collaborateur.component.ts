import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl, ValidatorFn} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CollaborateurService } from '../services/http/collaborateurs/collaborateur.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { LocalisationService } from '../services/http/localisation/localisation.service';
import { CuidService } from '../services/http/cuid/cuid.service';
import swal from 'sweetalert2';
import { LocalisationModalComponent } from '../modals/localisation/localisation.component';
import { AffectationService } from '../services/http/affectation/affectation.service';

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
  aaaaCuid: String;
  collaborateur: Collaborateur;
  tabCuidCollaborateur: CuidCollaborateur;
  chipsCuid: string[] = [];

  local: String;

  collabForm = new FormGroup({

    trigrame : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(4)
    ]),
    nom : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$'),
      Validators.maxLength(25)
    ]),  
    prenom : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$'),
      Validators.maxLength(25)
    ]),
    localisation : new FormControl('', [
      Validators.required,
    ]),
    role : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$'),
      Validators.maxLength(30)
    ]),
    password : new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10)
    ]),
    passwordVerif : new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(10)
    ]),
  });

  constructor(
    private collaborateurService: CollaborateurService,
    private localisationService: LocalisationService,
    private cuidService: CuidService,
    private affectationService: AffectationService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.localisationService.getLocalisations()
    .subscribe((data: any) => {
        this.localisations = data;
        console.log(this.localisations);
    });

    this.cuidService.getTabCuid()
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



    this.localisations.forEach(function(element){

      if(element.id == this.collabForm.get("localisation").value){
        this.local = element.pays; 
      }
    }, this);

    this.collabForm.setValue
    this.collaborateur = {

      trigrame: this.collabForm.get("trigrame").value,
      role: this.collabForm.get("role").value,
      mdp: this.collabForm.get("password").value,
      nom: this.collabForm.get("nom").value,
      prenom: this.collabForm.get("prenom").value,
      localisation: {
        id:this.collabForm.get("localisation").value,
        pays:this.local
      },
      statusCollaborateur: 1
    }

    this.collaborateurService.addCollaborateur(this.collaborateur)
    .subscribe((data: any) => {


      this.addCuids.forEach(function(element){

        this.tabCuidCollaborateur = {
          cuidcollaborateurId:{
            cuid: element.cuid,
            trigrame: this.collaborateur.trigrame
          },
          dateaffectation: "2018-11-09",
          
        }

        this.affectationsService.addAffectations(this.tabCuidCollaborateur)
        .subscribe((data: any) => {
        //  swal('Succès', 'Les collaborateurs ont été ajouté', 'success');
        }, (err) => {
        //  swal('Erreur', 'Problème lors de la création des collaborateurs', 'error');
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
}); 
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
      this.cuids.forEach(function(element){

      if(element.cuid == cuid){

        element.utiliser = true;
        this.addCuids.push(element);
      }
        
      }, this)
    }
  }

  openDialogLocalisation(): void {
    const dialogRef = this.dialog.open(LocalisationModalComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
     
      if(result !== null && result !== undefined)
        this.localisations = result;
    });
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

    colorCollab(nbrCuid: number){
      if(nbrCuid >= 1) return 'text-danger';
      return '';
    }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



