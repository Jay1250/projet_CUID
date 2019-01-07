//angular
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {Router} from '@angular/router';

//components
import { OutilsModalComponent } from '../modals/outils/outils.component';
import { ApplicationsModalComponent } from '../modals/applications/applications.component';
import { DateCollabModalComponent } from '../modals/date-collab/date-collab.component';

//services
import { CreationCuidService } from '../services/creation-cuid/creation-cuid.service';
import { AffectationsService } from '../services/affectations/affectations.service';
import { TabCollaborateurService } from '../services/tab-collaborateur/tab-collaborateur.service';
import {FormStateMatcherService} from '../services/form-state-matcher/form-state-matcher.service'

// interfaces
import {Cuid} from '../interfaces/cuid';
import {CollaborateurInfo} from '../interfaces/collaborateur-info';
import {Outil} from '../interfaces/outil';
import {Application} from '../interfaces/application';
import {Contrat} from '../interfaces/contrat';
import {CuidCollaborateur} from '../interfaces/cuid-collaborateur';

//others
import swal from 'sweetalert2';

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
  displayedColumns: string[] = ['trigrame','role', 'nomprenom', 'pays', 'nbr_cuid', 'ajouter'];
  dataSource;

  CollaborateurInfos: CollaborateurInfo[] = [];
  tabCuidCollaborateur: CuidCollaborateur[] = [];
  outils: Outil[] = [];
  applications: Application[] = [];
  contrats: Contrat[] = [];
  newCuid: Cuid;

  chipsCollaborateur: string[] = [];
  matcher = new FormStateMatcherService();
 
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
      Validators.maxLength(250)
    ]),

  });

  constructor(private creationCuidService: CreationCuidService, 
              private tabCollaborateurService: TabCollaborateurService,
              public dialog: MatDialog,
              private affectationsService: AffectationsService,
              private router: Router
              ) {}

  ngOnInit() {

    this.affectationsService.getAffectations()
    .subscribe((data: any) => {
        this.tabCuidCollaborateur = data;
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
      this.dataSource = new MatTableDataSource<CollaborateurInfo>(this.CollaborateurInfos);
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

  openDialogDateCollab(index): void{
    const dialogRef = this.dialog.open(DateCollabModalComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
      this.CollaborateurInfos[0].dateaffectation;
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

    if(this.isValidForm()){

      this.newCuid = {
        cuid: this.cuidForm.get("ccuid").value, 
        nom:  this.cuidForm.get("nom").value, 
        prenom: this.cuidForm.get("prenom").value, 
        mdp: this.cuidForm.get("password").value, 
        status: (this.CollaborateurInfos.filter(element => element.utiliser == true).length > 0)? 1 : 0, 
        commentaires:  this.cuidForm.get("commentaires").value,           
        nomgir: this.cuidForm.get("nomGir").value, 
        prenomgir: this.cuidForm.get("prenomGir").value, 
        contrat: this.contrats.filter(element => element.id == this.cuidForm.get("ccontrat").value)[0],
        outil: this.outils.filter(element => element.utiliser == true),
        applications: this.applications.filter(element => element.utiliser == true),
        };

        this.outils.forEach(function(element){
          delete element.utiliser;
        });
        this.applications.forEach(function(element){
          delete element.utiliser;
        });

      this.creationCuidService.addCuid(this.newCuid)
        .subscribe((data: any) => {

          swal('Succès', 'Le cuid a bien été crée', 'success');

          this.CollaborateurInfos.filter(element => element.utiliser == true).forEach(function(element){

          this.cuidCollaborateur = {
            cuidcollaborateurId:{
              cuid: this.newCuid.cuid,
              trigrame: element.trigrame
            },
            dateaffectation: element.dateaffectation,
            dateliberation: element.dateliberation
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
        console.error(err);
      }); 
      this.router.navigateByUrl('/tabCuid');
    }
  }

  ajouterCollab(trigrame){

    if(this.chipsCollaborateur.includes(trigrame))
      swal('Erreur', 'Ce collaborateur est déjà ajouté', 'error');

    else {
      this.chipsCollaborateur.push(trigrame);
      this.CollaborateurInfos.forEach(function(element){

      if(element.trigrame == trigrame){

        element.utiliser = true;

        const dialogRef = this.dialog.open(DateCollabModalComponent, {width: '250px'});
        dialogRef.afterClosed().subscribe(result => {
          element.dateaffectation = result.affectation;
          element.dateliberation = result.liberation;
          });
        }
      }, this)
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

  isValidForm(): boolean{

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

    else
      return true;

    return false;
  }
}