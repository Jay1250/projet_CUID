//angular
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatDialog} from '@angular/material';

//services
import { ContratService } from '../services/http/contrat/contrat.service';
import { CuidService } from '../services/http/cuid/cuid.service';
import { AffectationService } from '../services/http/affectation/affectation.service';
import {SharedService} from '../services/shared/shared.service';
//interfaces
import {Contrat} from '../interfaces/contrat';
import {CuidTab} from '../interfaces/cuid-tab';
import {AffectationTab} from '../interfaces/affectation-tab'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() test: any;
  selectable = true;
  removable = true;
  contrats: Contrat[] = [];
  cuids: CuidTab[] = [];
  affectations: AffectationTab[] = [];
  nomContrat: String;

  nbrCuid : number = 0; 
  nbrCuidNonAffect: number = 0;
  nbrCuidUnCollab: number = 0;
  nbrCuidPlusieursCollab: number = 0;

  displayedColumns: string[] = ['cuid', 'trigrame','nomprenom', 'contrat', 'dateaffectation', 'dateliberation'];
  dataSource;

  hello: any;

  constructor(
    private contratService: ContratService,
    private cuidService: CuidService,
    private affectationService: AffectationService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {

    this.sharedService.notify$.subscribe((data) => {this.hello = data});
    console.log(this.hello);
    this.nomContrat = 'tous'
    this.contratService.getContrats()
    .subscribe((data: any) => {
        this.contrats = data;
    });
    this.cuidService.getTabCuid()
    .subscribe((data: any) => {
        this.cuids = data;
        this.calcNbrCuid();
    });
    this.affectationService.getAffectationTabEnCours()
    .subscribe((data: any) => {
        this.affectations = data;
        this.dataSource = new MatTableDataSource<AffectationTab>(this.affectations);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  filtreTabAffectations(){
    if(this.nomContrat != "tous"){
      this.dataSource = new MatTableDataSource<AffectationTab>(
        this.affectations.filter(element => element.contrat == this.nomContrat)
        );
    }
    else
      this.dataSource = new MatTableDataSource<AffectationTab>(this.affectations);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  calcNbrCuid(){
    this.nbrCuid = 0 ;
    this.nbrCuidNonAffect = 0;
    this.nbrCuidUnCollab = 0;
    this.nbrCuidPlusieursCollab = 0;
    if(this.nomContrat == "tous"){
      this.nbrCuid = this.cuids.length;
      this.cuids.forEach(element => {
        if(element.nbcollab == 0) this.nbrCuidNonAffect++;
        else if(element.nbcollab == 1) this.nbrCuidUnCollab++;
        else if(element.nbcollab > 1) this.nbrCuidPlusieursCollab++;
      });
    }
    else{
      this.cuids.forEach(function(element){
        if(element.contrat == this.nomContrat){
          if(element.nbcollab == 0) this.nbrCuidNonAffect++;
          else if(element.nbcollab == 1) this.nbrCuidUnCollab++;
          else if(element.nbcollab > 1) this.nbrCuidPlusieursCollab++;
          this.nbrCuid++;
        } 
      }, this);
    }
  }
  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}