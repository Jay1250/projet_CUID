import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { CreationCuidService } from '../services/creation-cuid/creation-cuid.service';
import { AffectationsService } from '../services/affectations/affectations.service';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { TabCollaborateurService } from '../services/tab-collaborateur/tab-collaborateur.service';
import {SelectionModel} from '@angular/cdk/collections';
import {ErrorStateMatcher} from '@angular/material/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import { OutilsModalComponent } from '../modals/outils/outils.component';
import { ApplicationsModalComponent } from '../modals/applications/applications.component';
import { DateCollabModalComponent } from '../modals/date-collab/date-collab.component';
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
  applications: Application[];
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
  utiliser: boolean;
  contrat_id: number;
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
  outilsCuid: Outil[] = [];
  applications: Application[] = [];
  applicationsCuid: Application[] = [];
  contrats: Contrat[] = [];
  contratsCuid: Contrat[] = [];
  test:any[] = [];
  newCuid: Cuid;
  chipsCollaborateur: string[] = [];
  matcher = new MyErrorStateMatcher();

  dateNom: Date;

  cuidForm = new FormGroup({

    ccuid : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(9)
    ]),
    ccontrat : new FormControl('', [
      Validators.required,
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
    nomGir : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$'),
      Validators.maxLength(25)
    ]),
    prenomGir : new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$'),
      Validators.maxLength(25)
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
    commentaires : new FormControl('', [
      Validators.required,
      Validators.maxLength(250)
    ]),
  
  });

  constructor(private creationCuidService: CreationCuidService, 
              private tabCollaborateurService: TabCollaborateurService,
              public dialog: MatDialog,
              private affectationsService: AffectationsService,
              ) { }

  ngOnInit() {

    this.affectationsService.getAffectations()
    .subscribe((data: any) => {
        this.tabCuidCollaborateur = data;
        console.log(this.tabCuidCollaborateur);
    }, (err) => {

      switch(err.status){
        case 0:
          swal('Erreur', 'Impossible de se connecter au serveur', 'error');
          break;
        default:
          swal('Erreur', 'Une erreur inconnue s\est produite lors de la création du Cuid', 'error');
      }
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
       console.log(this.applications)
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

  openDialogDateCollab(): void{
    const dialogRef = this.dialog.open(DateCollabModalComponent, {width: '250px'});
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

    this.CollaborateurInfos.forEach(function(element){
      if(element.trigrame == chip)
        element.utiliser = false;
      })
  }

  azerty(){

    // this.applications = this.cuidForm.value.contrat.applications;
    console.log(this.applications)
  }

  hello(vaz){

    this.cuidForm.get("ccuid").markAsTouched();
    this.cuidForm.get("ccontrat").markAsTouched();
    this.cuidForm.get("nom").markAsTouched();
    this.cuidForm.get("prenom").markAsTouched();
    this.cuidForm.get("nomGir").markAsTouched();
    this.cuidForm.get("prenomGir").markAsTouched();
    this.cuidForm.get("password").markAsTouched();
    this.cuidForm.get("passwordVerif").markAsTouched();
    this.cuidForm.get("commentaires").markAsTouched();

    if(this.cuidForm.get("ccuid").hasError("required") || this.cuidForm.get("ccontrat").hasError("required") || this.cuidForm.get("nom").hasError("required")
    || this.cuidForm.get("prenom").hasError("required") || this.cuidForm.get("nomGir").hasError("required") || this.cuidForm.get("prenomGir").hasError("required")
    || this.cuidForm.get("password").hasError("required") || this.cuidForm.get("passwordVerif").hasError("required"))
        swal('Erreur', 'Les champs (*) sont obligatoires !', 'error');

    else if(this.cuidForm.get("ccuid").hasError("minlength") || this.cuidForm.get("nom").hasError("minlength")
    || this.cuidForm.get("prenom").hasError("minlength") || this.cuidForm.get("nomGir").hasError("minlength") || this.cuidForm.get("prenomGir").hasError("minlength")
    || this.cuidForm.get("password").hasError("minlength") || this.cuidForm.get("passwordVerif").hasError("minlength"))
        swal('Erreur', 'Les champs ont une taille min de 3 charactères', 'error');

    else if(this.cuidForm.get("nom").hasError("pattern")
    || this.cuidForm.get("prenom").hasError("pattern") || this.cuidForm.get("nomGir").hasError("pattern") || this.cuidForm.get("prenomGir").hasError("pattern"))
        swal('Erreur', 'Les champs nom/prénom ne doivent être composés que de lettres', 'error');

    else if(this.cuidForm.get("password").value !== this.cuidForm.get("passwordVerif").value)
      swal('Erreur', 'Les deux champs de mot de passe ne correspondent pas', 'error');

    else{
      this.outilsCuid = this.outils.filter(element => element.utiliser == true);
      this.applicationsCuid = this.applications.filter(element => element.utiliser == true);
      this.outils.forEach(function(element){
        delete element.utiliser;
      });
      this.applications.forEach(function(element){
        delete element.utiliser;
      });

     this.contratsCuid = this.contrats.filter(element => element.id == this.cuidForm.get("ccontrat").value);
      this.CollaborateurInfos = this.CollaborateurInfos.filter(element => element.utiliser == true);

      this.newCuid = {
        cuid: this.cuidForm.get("ccuid").value, 
        nom:  this.cuidForm.get("nom").value, 
        prenom: this.cuidForm.get("prenom").value, 
        mdp: this.cuidForm.get("password").value, 
        status: 1, 
        commentaires:  this.cuidForm.get("commentaires").value,           
        nomgir: this.cuidForm.get("nomGir").value, 
        prenomgir: this.cuidForm.get("prenomGir").value, 
        //marche pas
        contrat: this.contratsCuid[0],
        outil: this.outilsCuid,
        applications: this.applicationsCuid,
        };

      this.creationCuidService.addCuid(this.newCuid)
        .subscribe((data: any) => {

          swal('Succès', 'Le cuid a bien été crée', 'success');
          this.dateNom  = new Date();
          let dateNowISO = this.dateNom.toISOString();

          this.CollaborateurInfos.forEach(function(element){

          this.cuidCollaborateur = {
            cuidcollaborateurId:{
              cuid: this.newCuid.cuid,
              trigrame: element.trigrame
            },
            dateaffectation: dateNowISO,
            dateliberation: "2018-11-09"
          }

          this.affectationsService.addAffectations(this.cuidCollaborateur)
            .subscribe((data: any) => {
              //swal('Succès', 'Les collaborateurs ont été ajouté', 'success');
            }, (err) => {
              //swal('Erreur', 'Problème lors de la création des collaborateurs', 'error');
            }); 
          }, this);
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
            case 0:
              swal('Erreur', 'Impossible de se connecter au serveur', 'error');
              break;
            default:
              swal('Erreur', 'Une erreur inconnue s\est produite lors de la création du Cuid', 'error');
          }

        //Observable.throw(err);
        // throw new Error(err);
        console.error(err);
      }); 
      //  window.location.href='tabCuid';
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

    //onsole.log();
    //console.log(form.value);
  }

  colorCuid(nbr_cuid: number){
    if(nbr_cuid >= 1) return 'text-danger';
    return '';
  }

  //test
  bonjour(){
    this.dateNom  = new Date();
    let dateNowISO = this.dateNom.toISOString();  
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}