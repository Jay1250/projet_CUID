// angular
import { Component, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl, ValidatorFn} from '@angular/forms';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {ErrorStateMatcher} from '@angular/material/core';
import {Router} from '@angular/router';

//components
import { DateCollabModalComponent } from '../modals/date-collab/date-collab.component';

//services
import { CollaborateurService } from '../services/http/collaborateurs/collaborateur.service';
import { LocalisationService } from '../services/http/localisation/localisation.service';
import { CuidService } from '../services/http/cuid/cuid.service';
import { AffectationService } from '../services/http/affectation/affectation.service';
import {FormStateMatcherService} from '../services/form-state-matcher/form-state-matcher.service'

//components
import { LocalisationModalComponent } from '../modals/localisation/localisation.component';

// interfaces
import {Collaborateur} from '../interfaces/collaborateur';
import {Cuid} from '../interfaces/cuid';
import {CuidTab} from '../interfaces/cuid-tab';
import {Localisation} from '../interfaces/localisation';
import {CuidCollaborateur} from '../interfaces/cuid-collaborateur';

//others
import swal from 'sweetalert2';

@Component({
  selector: 'app-creation-collaborateur',
  templateUrl: './creation-collaborateur.component.html',
  styleUrls: ['./creation-collaborateur.component.scss']
})
export class CreationCollaborateurComponent implements OnInit {

  //tab cuids
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectable = true;
  removable = true;
  displayedColumns: string[] = ['cuid','contrat', 'nomprenom', 'manager', 'nbcollab', 'nbapplis', 'ajouter'];
  dataSource;
  chipsCuid: string[] = [];

  //data 
  localisations: Localisation[] = [];
  cuids: Cuid[] = [];
  tabCuids: CuidTab[] = [];
  addCuids: Cuid[] = [];
  collaborateur: Collaborateur;
  tabCuidCollaborateur: Collaborateur;

  newCollaborateur: Collaborateur;
  collaborateursCuid: CuidCollaborateur[] = [];

  disable = true;
  local: String;

  // form
  matcher = new FormStateMatcherService();
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
    private router: Router
  ) { }

  ngOnInit() {

    this.localisationService.getLocalisations()
    .subscribe((data: any) => {
        this.localisations = data;
    });

    this.cuidService.getTabCuid()
    .subscribe((data: any) => {
      this.cuids = data;
      this.dataSource = new MatTableDataSource<Cuid>(this.cuids);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

    // ***** modal windows
    openDialogLocalisation(): void {
      const dialogRef = this.dialog.open(LocalisationModalComponent, {width: '250px'});
      dialogRef.afterClosed().subscribe(result => {
      
        if(result !== null && result !== undefined)
          this.localisations = result;
      });
    }

    // ***** tab Cuids
    ajouterCuid(cuid){
  
      if(this.chipsCuid.includes(cuid))
        swal('Erreur', 'Ce cuid est déjà ajouté', 'error');
  
      else {
        this.tabCuids.forEach(function(element){
          if(element.cuid == cuid){
            const dialogRef = this.dialog.open(DateCollabModalComponent, {width: '250px'});
            dialogRef.afterClosed().subscribe(result => {
              if(result.affectation != null){
                this.collaborateursCuid.push(
                  {
                    cuid: {cuid: element.cuid},
                    collaborateurs: null,
                    dateaffectation: result.affectation,
                    dateliberation: result.liberation
                  }
                );
              //  this.chipsCuid.push(trigrame);
              }
              else swal('Erreur', 'La date d\'affectation est obligatoire', 'error');
            });
          }
        });
      }
    }

    removeChip(chip: string): void {
      const index = this.chipsCuid.indexOf(chip);
      if (index >= 0) this.chipsCuid.splice(index, 1);
      
      for(var i=0; i < this.collaborateursCuid.length; i++){
        if(this.collaborateursCuid[i].collaborateurs.trigrame == chip)
          delete this.collaborateursCuid[i];
      }
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    colorCollab(nbrCuid: number){
      if(nbrCuid >= 1) return 'text-danger';
      return '';
    }
    // *****

    // ***** form
    validationCollaborateur(){
      if(this.isValidForm()){
        // creation cuid
        this.newCollaborateur = {
          trigrame: this.collabForm.get("ccuid").value, 
          role:  this.collabForm.get("nom").value,  
          mdp: this.collabForm.get("password").value, 
          nom:  this.collabForm.get("commentaires").value,           
          prenom: this.collabForm.get("prenomGir").value, 
          localisation: this.collabForm.get("prenomGir").value
        };
  
        // post cuid
        this.collaborateurService.addCollaborateur(this.newCollaborateur)
          .subscribe((data: any) => {
  
            swal('Succès', 'Le collaborateur a bien été crée', 'success');
            this.router.navigateByUrl('/tabCuid');
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
      }
    }

    isValidForm(): boolean{
      this.collabForm.get("trigrame").markAsTouched();
      this.collabForm.get("nom").markAsTouched();
      this.collabForm.get("prenom").markAsTouched();
      this.collabForm.get("localisation").markAsTouched();
      this.collabForm.get("role").markAsTouched();
      this.collabForm.get("password").markAsTouched();
      this.collabForm.get("passwordVerif").markAsTouched();
  
      if(this.collabForm.get("trigrame").hasError("required") || this.collabForm.get("nom").hasError("required")
        || this.collabForm.get("prenom").hasError("required") || this.collabForm.get("localisation").hasError("required") || this.collabForm.get("role").hasError("required")
        || this.collabForm.get("password").hasError("required") || this.collabForm.get("passwordVerif").hasError("required"))
        swal('Erreur', 'Les champs (*) sont obligatoires !', 'error');
      else if(this.collabForm.get("trigrame").hasError("minlength") || this.collabForm.get("nom").hasError("minlength")
      || this.collabForm.get("prenom").hasError("minlength") || this.collabForm.get("role").hasError("minlength")
      || this.collabForm.get("password").hasError("minlength") || this.collabForm.get("passwordVerif").hasError("minlength"))
          swal('Erreur', 'Les champs ont une taille min de 3 charactères', 'error');
      else if(this.collabForm.get("nom").hasError("pattern")
      || this.collabForm.get("prenom").hasError("pattern"))
          swal('Erreur', 'Les champs nom/prénom ne doivent être composés que de lettres', 'error');
      else if(this.collabForm.get("password").value !== this.collabForm.get("passwordVerif").value)
        swal('Erreur', 'Les deux champs de mot de passe ne correspondent pas', 'error');
      else
        return true;
      return false;
    }
}