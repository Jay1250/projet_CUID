//angular
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ErrorStateMatcher} from '@angular/material/core';
import{ActivatedRoute} from '@angular/router'
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup} from '@angular/forms';

//services
//import { CreationCuidService } from '../services/http/cuid/cuid.service';
import { AffectationService } from '../services/http/affectation/affectation.service';
import { CuidService } from '../services/http/cuid/cuid.service';
import { CollaborateurService } from '../services/http/collaborateurs/collaborateur.service';
import {FormStateMatcherService} from '../services/form-state-matcher/form-state-matcher.service';

//components
import { ModalAjoutOutilComponent } from '../modals/modal-ajout-outil/modal-ajout-outil.component';
import { ModalAjoutApplicationComponent } from '../modals/modal-ajout-application/modal-ajout-application.component';

//interfaces
import {Cuid} from '../interfaces/cuid';
import {Collaborateur} from '../interfaces/collaborateur';
import {Outil} from '../interfaces/outil';
import {Application} from '../interfaces/application';

//others
import Swal from 'sweetalert2';
import { CuidCollaborateur } from '../interfaces/cuid-collaborateur';

@Component({
  selector: 'app-fiche-cuid',
  templateUrl: './fiche-cuid.component.html',
  styleUrls: ['./fiche-cuid.component.scss']
})
export class FicheCuidComponent implements OnInit {

  // tab collaborateurs
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectable = true;
  removable = false;
  displayedColumns: string[] = ['trigrame', 'nomprenom', 'pays', 'dateaffectation', 'dateliberation','action'];
  dataSource;

  // data
  outils: Outil[] = [];
  applications: Application[] = [];
  getCuid;
  cuid: Cuid = {cuid: '', nom: '', prenom: '', mdp: '', status: null, commentaires: '', 
  nomgir: '', prenomgir: '', contrat: {id: null, nom: ''}, outil: null, applications: null, cuidCollaborateur: null};
  chipsCollaborateur: string[] = [];
  tabCuidCollaborateur: CuidCollaborateur;

  selection = new SelectionModel<Collaborateur>(true, []);
  dateNow  = new Date();

  //form
  matcher = new FormStateMatcherService();
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
    ])
});

  constructor(private collaborateurService: CollaborateurService,
              public dialog: MatDialog,
              private affectationsService: AffectationService,
              private cuidService: CuidService,
              private route: ActivatedRoute) { }

  ngOnInit() {

    // recup param get cuid
    this.getCuid = this.route.snapshot.params['cuid'];

    this.cuidService.getCuid(this.getCuid)
    .subscribe((data: any) => {

      this.cuid = {cuid: data.cuid, 
                  nom: data.nom, 
                  prenom: data.prenom, 
                  mdp: null, 
                  status: data.status, 
                  commentaires: data.commentaires, 
                  nomgir: data.nomgir, 
                  prenomgir: data.prenomgir, 
                  contrat: data.contrat, 
                  outil: data.outil, 
                  applications: data.applications,
                  cuidCollaborateur: null
                };

      this.cuidForm.get("ccuid").setValue(data.cuid);
      this.cuidForm.get("ccontrat").setValue(data.contrat.nom);
      this.cuidForm.get("nom").setValue(data.nom);
      this.cuidForm.get("prenom").setValue(data.prenom); 
      this.cuidForm.get("nomGir").setValue(data.nomgir);
      this.cuidForm.get("prenomGir").setValue(data.prenomgir);
      this.cuidForm.get("commentaires").setValue(data.commentaires);
    }, (err) => {
 
    
    });




    //recup Collaborateurs of Cuid
    this.affectationsService.getAffectationCuid(this.getCuid)
    .subscribe((data: any) => {
      this.tabCuidCollaborateur = data;
      if(data != null && data != undefined){
        this.dataSource = new MatTableDataSource<CuidCollaborateur>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
    });
    
  }

  openDialogOutil(): void {
    const dialogRef = this.dialog.open(ModalAjoutOutilComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
      if(result !== null && result !== undefined)
        this.outils = result;
    });
  }

  openDialogApp(): void {
    const dialogRef = this.dialog.open(ModalAjoutApplicationComponent, {width: '250px'});
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
/*
    if(this.isValidForm()){

      this.cuid.cuid = this.cuidForm.get("ccuid").value;
      this.cuid.nom = this.cuidForm.get("nom").value;
      this.cuid.prenom = this.cuidForm.get("prenom").value;
      this.cuid.commentaires = this.cuidForm.get("commentaires").value;
      this.cuid.nomgir = this.cuidForm.get("nomGir").value;
      this.cuid.prenomgir = this.cuidForm.get("prenomGir").value;
      this.cuid.contrat = this.cuidForm.get("contrat").value;

      this.cuidService.addCuid(this.cuid)
        .subscribe((data: any) => {

          swal('Succès', 'Le cuid a bien été crée', 'success');

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
    }*/
  }

  ajouterCollab(trigrame){
    if(this.chipsCollaborateur.includes(trigrame))
      Swal.fire(
        'Erreur',
        'Ce collaborateur est déjà ajouté',
        'error'
      )
    else 
      this.chipsCollaborateur.push(trigrame);
  }

  onSubmit(form: NgForm) {
    console.log();
    console.log(form.value);
  }

  modifierCuid(estModifiable: boolean) {

if(estModifiable){
  this.removable = true;
  this.cuidForm.get('ccuid').enable();
  this.cuidForm.get('ccontrat').enable();
  this.cuidForm.get('nom').enable();
  this.cuidForm.get('prenom').enable();
  this.cuidForm.get('nomGir').enable();
  this.cuidForm.get('prenomGir').enable();
  this.cuidForm.get('commentaires').enable();
  this.disable = false;
}
else{
  this.removable = false;
  this.cuidForm.get('ccuid').disable();
  this.cuidForm.get('ccontrat').disable();
  this.cuidForm.get('nom').disable();
  this.cuidForm.get('prenom').disable();
  this.cuidForm.get('nomGir').disable();
  this.cuidForm.get('prenomGir').disable();
  this.cuidForm.get('commentaires').disable();
  this.disable = true;;
}


  }

  estDateExpiree(date: Date){
    return new Date(date).getTime() <  this.dateNow.getTime();
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
      Swal.fire(
        'Erreur',
        'Les champs (*) sont obligatoires !',
        'error'
      )
    else if(this.cuidForm.get("ccuid").hasError("minlength") || this.cuidForm.get("nom").hasError("minlength")
    || this.cuidForm.get("prenom").hasError("minlength") || this.cuidForm.get("nomGir").hasError("minlength") || this.cuidForm.get("prenomGir").hasError("minlength")
    || this.cuidForm.get("password").hasError("minlength") || this.cuidForm.get("passwordVerif").hasError("minlength"))
      Swal.fire(
        'Erreur',
        'Les champs ont une taille min de 3 charactères',
        'error'
      )
    else if(this.cuidForm.get("nom").hasError("pattern")
    || this.cuidForm.get("prenom").hasError("pattern") || this.cuidForm.get("nomGir").hasError("pattern") || this.cuidForm.get("prenomGir").hasError("pattern"))
      Swal.fire(
        'Erreur',
        'Les champs nom/prénom ne doivent être composés que de lettres',
        'error'
      )
    else if(this.cuidForm.get("password").value !== this.cuidForm.get("passwordVerif").value)
      Swal.fire(
        'Erreur',
        'Les deux champs de mot de passe ne correspondent pas',
        'error'
      )
    else
      return true;
    return false;
  }
}