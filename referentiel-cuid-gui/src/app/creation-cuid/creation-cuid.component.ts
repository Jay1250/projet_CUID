//angular
import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';

//components
import { OutilsModalComponent } from '../modals/outils/outils.component';
import { ApplicationsModalComponent } from '../modals/applications/applications.component';
import { DateCollabModalComponent } from '../modals/date-collab/date-collab.component';

//services
import { CuidService } from '../services/http/cuid/cuid.service';
import { AffectationService } from '../services/http/affectation/affectation.service';
import { CollaborateurService } from '../services/http/collaborateurs/collaborateur.service';
import {FormStateMatcherService} from '../services/form-state-matcher/form-state-matcher.service'
import { OutilService } from '../services/http/outil/outil.service';
import { ApplicationService } from '../services/http/application/application.service';
import { ContratService } from '../services/http/contrat/contrat.service';

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

  // tab collaborateurs
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectable = true;
  removable = true;
  displayedColumns: string[] = ['trigrame','role', 'nomprenom', 'pays', 'nbr_cuid', 'ajouter'];
  dataSource;
  chipsCollaborateur: string[] = [];

  //data
  infoCollaborateurs: CollaborateurInfo[] = [];
  outils: Outil[] = [];
  applications: Application[] = [];
  contrats: Contrat[] = [];

  //creation Cuid
  newCuid: Cuid;
  collaborateursCuid: CuidCollaborateur[] = [];
  //outilsCuid: Outil[] = [];
  //applicationsCuid: Application[] = [];
  
// form
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

  constructor(private cuidService: CuidService, 
              private collaborateurService: CollaborateurService,
              public dialog: MatDialog,
              private affectationService: AffectationService,
              private outilService: OutilService,
              private applicationService: ApplicationService,
              private contratService: ContratService,
              private router: Router
              ) {}

  ngOnInit() {

    //recup outils
    this.outilService.getOutils()
    .subscribe((data: any) => {
        this.outils = data;
        this.outils.forEach(function(outil){
          outil.utiliser = false;
        })
    });

    // recup applis
    this.applicationService.getApplications()
    .subscribe((data: any) => {
        this.applications = data;
        this.applications.forEach(function(application){
          application.utiliser = false;
        })
    });

    //recup contrats
    this.contratService.getContrats()
    .subscribe((data: any) => {
        this.contrats = data;
    });

    //recup tab collaborateurs
    this.collaborateurService.getTabCollaborateur()
    .subscribe((data: any) => {
        this.infoCollaborateurs = data;
      // tab constructor 
      this.dataSource = new MatTableDataSource<CollaborateurInfo>(this.infoCollaborateurs);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  // ***** modal windows
  openDialogOutil(): void {
    const dialogRef = this.dialog.open(OutilsModalComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
      if(result !== null && result !== undefined) this.outils = result;
    });
  }
  openDialogApp(): void {
    const dialogRef = this.dialog.open(ApplicationsModalComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
    if(result !== null && result !== undefined) this.applications = result;
    });
  }
  openDialogDateCollab(index): void{
    const dialogRef = this.dialog.open(DateCollabModalComponent, {width: '250px'});
    dialogRef.afterClosed().subscribe(result => {
    //if(result !== null && result !== undefined) this.infoCollaborateurs[0].dateaffectation;
      });
  }
  // *****

  // ***** tab collaborateurs 
  ajouterCollab(trigrame){
    if(this.chipsCollaborateur.includes(trigrame))
      swal('Erreur', 'Ce collaborateur est déjà ajouté', 'error');
    else {
      this.infoCollaborateurs.forEach(function(element){
        if(element.collaborateurs.trigrame == trigrame){
          const dialogRef = this.dialog.open(DateCollabModalComponent, {width: '250px'});
          dialogRef.afterClosed().subscribe(result => {
            if(result.affectation != null){
              this.collaborateursCuid.push(
                {
                  cuid: null,
                  collaborateurs: element.collaborateurs,
                  dateaffectation: result.affectation,
                  dateliberation: result.liberation
                }
              );
              this.chipsCollaborateur.push(trigrame);
            }
            else swal('Erreur', 'La date d\'affectation est obligatoire', 'error');
          });
        }
      }, this)
    }
  }

  removeChip(chip: string): void {
    const index = this.chipsCollaborateur.indexOf(chip);
    if (index >= 0) this.chipsCollaborateur.splice(index, 1);
    
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

  colorRow(nbr_cuid: number){
    if(nbr_cuid >= 1) return 'text-danger';
    return '';
  }
  // ***** 

  // ***** form
  validationCuid(){
    if(this.isValidForm()){
      // creation cuid
      this.newCuid = {
        cuid: this.cuidForm.get("ccuid").value, 
        nom:  this.cuidForm.get("nom").value, 
        prenom: this.cuidForm.get("prenom").value, 
        mdp: this.cuidForm.get("password").value, 
        status: (this.collaborateursCuid.length > 0)? 1 : 0, 
        commentaires:  this.cuidForm.get("commentaires").value,           
        nomgir: this.cuidForm.get("nomGir").value, 
        prenomgir: this.cuidForm.get("prenomGir").value, 
        contrat: this.contrats.filter(element => element.id == this.cuidForm.get("ccontrat").value)[0],
        outil: this.outils.filter(element => element.utiliser == true),
        applications: this.applications.filter(element => element.utiliser == true),
        };

        this.newCuid.outil.forEach(function(element){
            delete element.utiliser;
        })
        this.newCuid.applications.forEach(function(element){
            delete element.utiliser;
        })

      // post cuid
      this.cuidService.addCuid(this.newCuid)
        .subscribe((data: any) => {

          if(this.collaborateursCuid.length > 0 ){

            this.collaborateursCuid.forEach(function(element){
              //ajout du cuid au collaborateurcuid
              element.cuid = this.newCuid;
  
              console.log(element);
  
              // post affectations
              this.affectationService.addAffectation(element)
                .subscribe((data: any) => {
                // swal('Succès', 'Le cuid a bien été crée', 'success');
                }, (err) => {
                  swal('Erreur', 'Le cuid a été crée mais un problème est survenu lors de l\'affectation du collaborateur', 'error');
                }); 
                swal('Succès', 'Le cuid a bien été crée', 'success');
                this.router.navigateByUrl('/tabCuid');
              }, this);
          }

          else{
            swal('Succès', 'Le cuid a bien été crée', 'success');
          //  this.router.navigateByUrl('/tabCuid');
          }

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
  // ***** 
}