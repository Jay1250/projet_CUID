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
  dateaffectation: Date;
  dateliberation: Date;
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
  removable = false;

  CollaborateurInfos: Collaborateur[] = [];
  cuidCollaborateur: CuidCollaborateur[] = [];
  tabCuidCollaborateur: CuidCollaborateur[] = [];
  displayedColumns: string[] = ['trigrame', 'prenom', 'pays', 'dateaffectation', 'dateliberation','action'];
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

  dateNow  = new Date();

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

    this.contrat = {id: null, nom: ''};

    this.cuid = this.route.snapshot.params['cuid'];
    console.log(this.cuid);

    this.cuidService.findById(this.cuid)
    .subscribe((data: any) => {

      this.cuidForm.get("ccuid").setValue(data.cuid);
      this.cuidForm.get("ccontrat").setValue(data.contrat.nom);
      this.cuidForm.get("nom").setValue(data.nom);
      this.cuidForm.get("prenom").setValue(data.prenom); 
      this.cuidForm.get("nomGir").setValue(data.nomgir);
      this.cuidForm.get("prenomGir").setValue(data.prenomgir);
      this.cuidForm.get("commentaires").setValue(data.commentaires);
      this.contrat = data.contrat;
        this.outils = data.outil;
        this.applications = data.applications;
    });

    this.affectationsService.getCollaborateursOfCuid(this.cuid)
    .subscribe((data: any) => {

      this.tabCuidCollaborateur = data;

      //marche pas
      if(data != null && data != undefined){
        this.dataSource = new MatTableDataSource<CuidCollaborateur>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
    });

    this.creationCuidService.getAllContrats()
    .subscribe((data: any) => {
        this.contrats = data;
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
  }

  ajouterCollab(trigrame){

    if(this.chipsCollaborateur.includes(trigrame))
      swal('Erreur', 'Ce collaborateur est déjà ajouté', 'error');
    else 
      this.chipsCollaborateur.push(trigrame);
  }

  onSubmit(form: NgForm) {
    console.log();
    console.log(form.value);
  }

  modifierCuid() {

    this.removable = true;
    this.cuidForm.get('ccuid').enable();
    this.cuidForm.get('ccontrat').enable();
    this.cuidForm.get('nom').enable();
    this.cuidForm.get('prenom').enable();
    this.cuidForm.get('nomGir').enable();
    this.cuidForm.get('prenomGir').enable();
    this.cuidForm.get('commentaires').enable();
  }

  estDateExpiree(date){
    return new Date(date).getTime() <  this.dateNow.getTime();
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

