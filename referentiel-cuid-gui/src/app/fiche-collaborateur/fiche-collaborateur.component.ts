//angular
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators, FormGroup, AbstractControl, ValidatorFn} from '@angular/forms';
import{ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

//services
import { CollaborateurService } from '../services/http/collaborateurs/collaborateur.service';
import { AffectationService } from '../services/http/affectation/affectation.service';
import { LocalisationService } from '../services/http/localisation/localisation.service';
import {FormStateMatcherService} from '../services/form-state-matcher/form-state-matcher.service';

//interfaces 
import { Collaborateur } from '../interfaces/collaborateur';
import { Localisation } from '../interfaces/localisation';
import {AffectationTab} from '../interfaces/affectation-tab';

//others 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fiche-collaborateur',
  templateUrl: './fiche-collaborateur.component.html',
  styleUrls: ['./fiche-collaborateur.component.scss']
})
export class FicheCollaborateurComponent implements OnInit {

  // tab cuids
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  selectable = true;
  removable = true;
  displayedColumns: string[] = ['cuid','nomprenom', 'contrat', 'dateaffectation', 'dateliberation', 'action'];
  dataSource;

  // data
  trigramCollab;
  affectations: AffectationTab[] = [];
  collaborateur: Collaborateur[] = [];
  localisations: Localisation[] = [];
  localisation: string;

  dateNow  = new Date();

  //form
  matcher = new FormStateMatcherService();
  disable=true;
  collabForm = new FormGroup({
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
    localisation : new FormControl({value: '', disabled: true}, [
      Validators.required,
    ]),
    role : new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('^[a-zA-Z]+$')
    ]),
    password : new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(5),
    ]),
    passwordVerif : new FormControl({value: '', disabled: true}, [
      Validators.required,
      Validators.minLength(5)
    ]),
  });

  constructor(private collaborateurService: CollaborateurService,
              private localisationService: LocalisationService,
              private route: ActivatedRoute,
              private affectationService: AffectationService,
              private router: Router) { }

  ngOnInit() {
    this.trigramCollab = this.route.snapshot.params['trigrame'];
    this.collaborateurService.getCollaborateur(this.trigramCollab)
    .subscribe((data: any) => {
      this.collaborateur = data;
      this.collabForm.get("nom").setValue(data.nom);
      this.collabForm.get("prenom").setValue(data.prenom);
      this.collabForm.get("localisation").setValue(data.localisation.pays);
      this.localisation = data.localisation.pays;
      this.collabForm.get("role").setValue(data.role); 
    }, (err) => {
      if(err.status == "404"){
        Swal.fire(
          'Erreur',
          'Ce collaborateur est introuvable',
          'error'
        )
        this.router.navigateByUrl('/tabCollaborateur');
      }
    });
    this.affectationService.getAffectationTabByCollab(this.trigramCollab)
    .subscribe((data: any) => {
        this.affectations = data;
        this.dataSource = new MatTableDataSource<AffectationTab>(this.affectations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }, (err) => {
      console.log("pouet");
    });
    this.localisationService.getLocalisations()
    .subscribe((data: any) => {
        this.localisations = data;
    });
  }

  modifierCuid(estModifiable: boolean) {
    if(estModifiable){
      this.removable = true;
      this.collabForm.get('nom').enable();
      this.collabForm.get('prenom').enable();
      this.collabForm.get('localisation').enable();
      this.collabForm.get('role').enable();
      this.disable = false;
    }
    else{
      this.removable = false;
      this.collabForm.get('nom').disable();
      this.collabForm.get('prenom').disable();
      this.collabForm.get('localisation').disable();
      this.collabForm.get('role').disable();
      this.disable = true;
    }
  }

  estDateExpiree(date: Date){
    return new Date(date).getTime() <  this.dateNow.getTime();
  }

  saveCollab(){  
  }
}