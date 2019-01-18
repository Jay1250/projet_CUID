//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

//services
import { CuidService } from '../services/http/cuid/cuid.service';

//interfaces
import {CuidTab} from '../interfaces/cuid-tab';



@Component({
	selector: 'app-tab-cuid',
	templateUrl: './tab-cuid.component.html',
	styleUrls: ['./tab-cuid.component.scss']
})

export class TabCuidComponent implements OnInit {

  //CuidInfos: CuidInfo[] = [];
  cuidTab: CuidTab[] = [];
  displayedColumns: string[] = ['cuid','contrat', 'nomprenom', 'manager', 'nbapplis', 'nbcollab', 'status'];
  dataSource: MatTableDataSource<CuidTab>;
  selection = new SelectionModel<CuidTab>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(  private cuidService: CuidService) {
   }

  ngOnInit() {
    this.cuidService.getTabCuid()
    .subscribe((data: any) => {
      data.forEach(element => {
        this.cuidTab.push(
          {
            cuid: element.cuid.cuid,
            contrat: element.cuid.contrat.nom,
            nomprenom: element.cuid.nom + " " + element.cuid.prenom,
            manager: element.cuid.nomgir + " " +element.cuid.prenomgir,
            nbapplis: element.nbapplis,
            nbcollab: element.nbcollab,
            status: element.cuid.status 
          }
        );
      }, this);
      this.dataSource = new MatTableDataSource<CuidTab>(this.cuidTab);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    console.log(filterValue.trim().toLowerCase())
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  colorCuid(nbcollab: number, status: String): String{
    let classRow: String = '';
    if(nbcollab > 1) classRow = 'text-danger';
    else if(status == "Inactif" || nbcollab == 0) classRow = 'text-secondary';
    return classRow;
  }
}
