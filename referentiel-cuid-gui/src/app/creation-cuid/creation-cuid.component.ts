import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CreationCuidService } from '../services/creation-cuid/creation-cuid.service';
import { AffectationsService } from '../services/affectations/affectations.service';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TabCollaborateurService } from '../services/tab-collaborateur/tab-collaborateur.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { OutilsModalComponent } from '../modals/outils/outils.component';
import { ApplicationsModalComponent } from '../modals/applications/applications.component';
import swal from 'sweetalert2';


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
	role: String;
	nomprenom: String;
	pays: number;
  nbr_cuid: number;
  utiliser: boolean;
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

  cuidcollaborateurId: {
    cuid: String;
    trigrame: String;
  }
  dateaffectation: String;
  dateliberation: String;
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
  selector: 'app-creation-cuid',
  templateUrl: './creation-cuid.component.html',
  styleUrls: ['./creation-cuid.component.scss']
})
export class CreationCuidComponent implements OnInit{

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  selectable = true;
  removable = true;

  CollaborateurInfos: Collaborateur[] = [];
  cuidCollaborateur: CuidCollaborateur;
  tabCuidCollaborateur: CuidCollaborateur[] = [];
  displayedColumns: string[] = ['trigrame','role', 'nomprenom', 'pays', 'nbr_cuid', 'ajouter'];
  dataSource;
  selection = new SelectionModel<Collaborateur>(true, []);

  outils: Outil[] = [];
  applications: Application[] = [];
  contrats: Contrat[] = [];
  test:any[] = [];
  newCuid: Cuid;
  champCuid;
  champContrat;
  champNom;
  champPrenom;
  champNomGir;
  champPrenomGir;
  champPassword;
  champPasswordVerif;
  champCommentaires;
  chipsCollaborateur: string[] = [];
  matcher = new MyErrorStateMatcher();

  ccuid = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);
  ccontrat = new FormControl('', [
    Validators.required,
  ]);
  nom = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z]+$')
  ]);  
  prenom = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z]+$')
  ]);
  nomGir = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z]+$')
  ]);
  prenomGir = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('^[a-zA-Z]+$')
  ]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  passwordVerif = new FormControl('', [
    Validators.required,
    Validators.minLength(5)
  ]);
  commentaires = new FormControl('', [
    Validators.required,
  ]);

  constructor(private creationCuidService: CreationCuidService, 
              private tabCollaborateurService: TabCollaborateurService,
              public dialog: MatDialog,
              private affectationsService: AffectationsService) { }

  ngOnInit() {

    this.affectationsService.getAffectations()
    .subscribe((data: any) => {
        this.tabCuidCollaborateur = data;
        console.log(this.tabCuidCollaborateur);
    });

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

    this.creationCuidService.getAllContrats()
    .subscribe((data: any) => {
        this.contrats = data;
    });

    this.tabCollaborateurService.getAllTabCuid()
    .subscribe((data: any) => {
        this.CollaborateurInfos = data;
        this.CollaborateurInfos.forEach(function(CollaborateurInfos){
          CollaborateurInfos.utiliser = false;
       })
      this.dataSource = new MatTableDataSource<Collaborateur>(this.CollaborateurInfos);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
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

  hello(vaz){

    this.ccuid.markAsTouched();
    this.ccontrat.markAsTouched();
    this.nom.markAsTouched();
    this.prenom.markAsTouched();
    this.nomGir.markAsTouched();
    this.prenomGir.markAsTouched();
    this.password.markAsTouched();
    this.passwordVerif.markAsTouched();
    this.commentaires.markAsTouched();

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
  
      let contrat;
      contrat = this.contrats.filter(element => element.id == this.ccontrat.value);
   
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
        contrat: {
          id: contrat[0].id,
          nom: contrat[0].nom
        },
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
  }

  ajouterCollab(trigrame){

    if(this.chipsCollaborateur.includes(trigrame))
      swal('Erreur', 'Ce collaborateur est déjà ajouté', 'error');

    else {
      this.chipsCollaborateur.push(trigrame);
      this.CollaborateurInfos.forEach(function(element){

      if(element.trigrame == trigrame)
        element.utiliser = true;
      })
    }
  }

  onSubmit(form: NgForm) {

    console.log();
    console.log(form.value);
  }
}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}