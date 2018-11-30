import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CreationCuidService } from '../services/creation-cuid/creation-cuid.service';
import { AffectationsService } from '../services/affectations/affectations.service';
import { CuidService } from '../services/cuid/cuid.service';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TabCollaborateurService } from '../services/tab-collaborateur/tab-collaborateur.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { OutilsModalComponent } from '../modals/outils/outils.component';
import { ApplicationsModalComponent } from '../modals/applications/applications.component';
import swal from 'sweetalert2';
import{ActivatedRoute} from '@angular/router'

export interface Cuid {
	cuid: String;
  nom: String;
  prenom: String;
  mdp: String;
  status: number;
	commentaires: String;
	nomgir: String;
	prenomgir: String;
  contrat: Contrat;
  outil: Outil[];
  application: Application[];
}

export interface Collaborateur {
	trigrame: String;
	nom: String;
	prenom: String;
	pays: number;
  dateaffectation: Date;
  dateliberation: Date;
}

export interface Outil {
	id: number;
  nomOutil: String;
  utiliser: boolean;
}

export interface Application {
	id: number;
  nomApplication: String;
  contrat_id: number;
  utiliser: boolean;
}

export interface Contrat {
	id: number;
  nom: String;
}

export interface CuidCollaborateur{

  cuid: String;
  trigrame: String;
  nom: String;
  prenom: String;
  pays: String;
  dateaffectation: String;
  dateliberation: String;
  statuscollaborateur: String;
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-fiche-cuid',
  templateUrl: './fiche-cuid.component.html',
  styleUrls: ['./fiche-cuid.component.scss']
})
export class FicheCuidComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectable = true;
  removable = true;

  CollaborateurInfos: Collaborateur[] = [];
  cuidCollaborateur: CuidCollaborateur[] = [];
  tabCuidCollaborateur: CuidCollaborateur[] = [];
  displayedColumns: string[] = ['trigrame','nom', 'prenom', 'pays', 'dateaffectation', 'dateliberation'];
  dataSource;
  selection = new SelectionModel<Collaborateur>(true, []);

  outils: Outil[] = [];
  applications: Application[] = [];
  contrats: Contrat[] = [];
  contrat: Contrat;
  cuid;
  newCuid: Cuid;
  chipsCollaborateur: string[] = [];
  matcher = new MyErrorStateMatcher();
  disable=true;

cuidForm = new FormGroup({

  ccuid : new FormControl({value: '', disabled: true}, [
    Validators.required,
    Validators.minLength(3),
  ]),
  ccontrat : new FormControl({value: 'hello', disabled: true}, [
    Validators.required,
  ]),
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
  nomGir : new FormControl({value: '', disabled: true}, [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z]+$')
  ]),
  prenomGir : new FormControl({value: '', disabled: true}, [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z]+$')
  ]),
  password : new FormControl({value: '', disabled: true}, [
    Validators.required,
    Validators.minLength(5)
  ]),
  passwordVerif : new FormControl({value: '', disabled: true}, [
    Validators.required,
    Validators.minLength(5)
  ]),
  commentaires : new FormControl({value: '', disabled: true}, [
    Validators.nullValidator,
  ]),

});

  constructor(private creationCuidService: CreationCuidService, 
              private tabCollaborateurService: TabCollaborateurService,
              public dialog: MatDialog,
              private affectationsService: AffectationsService,
              private cuidService: CuidService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    this.cuid = this.route.snapshot.params['cuid'];
    console.log(this.cuid);

    
    this.cuidService.findById(this.cuid)
    .subscribe((data: any) => {
        //this.tabCuidCollaborateur = data;
        console.log(data);
        console.log(data.contrat.nom);
//this.cuidForm.
        this.cuidForm.get("ccuid").setValue(data.cuid);
        this.cuidForm.get("ccontrat").setValue(data.contrat.nom);
        this.cuidForm.get("nom").setValue(data.nom);
        this.cuidForm.get("prenom").setValue(data.prenom); 
        this.cuidForm.get("nomGir").setValue(data.nomgir);
        this.cuidForm.get("prenomGir").setValue(data.prenomgir);
      //  this.cuidForm.get("password").setValue({value:data.password.value, disabled:true});
        this.cuidForm.get("commentaires").setValue(data.commentaires);

      this.contrat = data.contrat;


        this.outils = data.outil;
        this.applications = data.applications;
    });

    this.affectationsService.getCollaborateursOfCuid(this.cuid)
    .subscribe((data: any) => {

      
        this.tabCuidCollaborateur = data;
        //marche pas
       // if(data != null && data != undefined){
         // this.dataSource = new MatTableDataSource<CuidCollaborateur>(data);
         // console.log(this.dataSource);
         // this.dataSource.paginator = this.paginator;
         // this.dataSource.sort = this.sort;
       // }
      
    });
/*
    this.creationCuidService.getAllOutils()
    .subscribe((data: any) => {
        this.outils = data;
        this.outils.forEach(function(outil){
           outil.utiliser = false;
        })
    });

    this.creationCuidService.getAllApplications()
    .subscribe((data: any) => {
        this.applications = data;
        this.applications.forEach(function(application){
          application.utiliser = false;
       })
    });
*/


    this.creationCuidService.getAllContrats()
    .subscribe((data: any) => {
        this.contrats = data;
    });

    this.cuidService.recupCollaborateurs(this.cuid)
    .subscribe((data: any) => {
      console.log(data);
        this.cuidCollaborateur = data;
//console.log(this.CollaborateurInfos);

      this.dataSource = null;

      this.dataSource = new MatTableDataSource<CuidCollaborateur>(this.cuidCollaborateur);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log("dataSource" + this.dataSource);
    });

  }
  openDialogOutil(): void {
    const dialogRef = this.dialog.open(OutilsModalComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
     
      if(result !== null && result !== undefined)
        this.outils = result;
    });
  }

  openDialogApp(): void {
    const dialogRef = this.dialog.open(ApplicationsModalComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
     
    if(result !== null && result !== undefined)
      this.applications = result;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  removeChip(chip: string): void {
    const index = this.chipsCollaborateur.indexOf(chip);
    if (index >= 0) {
      this.chipsCollaborateur.splice(index, 1);
    }
  }

  hello(){

    this.cuidForm.controls.ccuid.markAsTouched();
    this.cuidForm.controls.ccontrat.markAsTouched();
    this.cuidForm.controls.nom.markAsTouched();
    this.cuidForm.controls.prenom.markAsTouched();
    this.cuidForm.controls.nomGir.markAsTouched();
    this.cuidForm.controls.prenomGir.markAsTouched();
    this.cuidForm.controls.commentaires.markAsTouched();

/*
    this.cuidForm.get('ccuid').disable();
    //this.cuidForm.get('ccontrat').disable();
    this.cuidForm.get('nom').disable();
    this.cuidForm.get('prenom').disable();
    this.cuidForm.get('nomGir').disable();
    this.cuidForm.get('prenomGir').disable();
    this.cuidForm.get('commentaires').disable();


*/

    this.outils.forEach(function(element){

//element.utiliser.disable();

    });


    //this.outils.utiliser

    //this.cuidForm.controls.prenom.
/*
    if(this.ccuid.hasError("required") || this.ccontrat.hasError("required") || this.nom.hasError("required")
    || this.prenom.hasError("required") || this.nomGir.hasError("required") || this.prenomGir.hasError("required")
    || this.password.hasError("required") || this.passwordVerif.hasError("required"))
        swal('Erreur', 'Les champs (*) sont obligatoires !', 'error');

    else if(this.ccuid.hasError("minlength") || this.nom.hasError("minlength")
    || this.prenom.hasError("minlength") || this.nomGir.hasError("minlength") || this.prenomGir.hasError("minlength")
    || this.password.hasError("minlength") || this.passwordVerif.hasError("minlength"))
        swal('Erreur', 'Les champs ont une taille min de 3 charactères', 'error');

    else if(this.nom.hasError("pattern")
    || this.prenom.hasError("pattern") || this.nomGir.hasError("pattern") || this.prenomGir.hasError("pattern"))
        swal('Erreur', 'Les champs nom/prénom ne doivent être composés que de lettres', 'error');

    else if(this.password.value !== this.passwordVerif.value)
      swal('Erreur', 'Les deux champs de mot de passe ne correspondent pas', 'error');

    else{
      this.outils = this.outils.filter(element => element.utiliser == true);
      this.applications = this.applications.filter(element => element.utiliser == true);
      this.outils.forEach(function(element){
        delete element.utiliser;
      });
      this.applications.forEach(function(element){
        delete element.utiliser;
      });

      this.contrats.filter(element => element.id == this.ccontrat.value);
      this.CollaborateurInfos = this.CollaborateurInfos.filter(element => element.utiliser == true);

      this.newCuid = {
        cuid: this.ccuid.value, 
        nom: this.nom.value, 
        prenom: this.prenom.value, 
        mdp: this.password.value, 
        status: 1, 
        commentaires: this.commentaires.value,           
        nomgir: this.nomGir.value, 
        prenomgir: this.prenomGir.value, 
        contrat: this.contrats[0],
        outil: this.outils,
        application: this.applications,
        };

      this.cuidCollaborateur = {
        cuidcollaborateurId:{
          cuid: this.newCuid.cuid,
          trigrame: this.CollaborateurInfos[0].trigrame
        },
        dateaffectation: "2018-11-09",
        dateliberation: "2018-11-09"
      }

      this.creationCuidService.addCuid(this.newCuid)
          .subscribe((data: any) => {

            this.affectationsService.addAffectations(this.cuidCollaborateur)
            .subscribe((data: any) => {
              swal('Succès', 'Les collaborateurs ont été ajouté', 'success');
            }, (err) => {
              swal('Erreur', 'Problème lors de la création des collaborateurs', 'error');
            }); 
  
            swal('Succès', 'Le cuid a bien été crée', 'success');
          }, (err) => {
          swal('Erreur', 'Problème lors de la création du Cuid', 'error');
      }); 
      window.location.href='tabCuid';
    }
    */
  }

  ajouterCollab(trigrame){

    if(this.chipsCollaborateur.includes(trigrame))
      swal('Erreur', 'Ce collaborateur est déjà ajouté', 'error');

    else {
      this.chipsCollaborateur.push(trigrame);
    }
  }

  onSubmit(form: NgForm) {

    console.log();
    console.log(form.value);
  }

  modifierCuid() {

    this.cuidForm.get('ccontrat').setValue('hello');

console.log("hello");

    this.cuidForm.get('ccuid').enable();
    this.cuidForm.get('ccontrat').enable();
    this.cuidForm.get('nom').enable();
    this.cuidForm.get('prenom').enable();
    this.cuidForm.get('nomGir').enable();
    this.cuidForm.get('prenomGir').enable();
    this.cuidForm.get('commentaires').enable();
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

