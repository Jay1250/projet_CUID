//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

//services
import { TabCuidService } from '../services/tab-cuid/tab-cuid.service';

export interface Cuid {
	cuid: string;
	nomprenom: String;
	manager: String;
	nbapplis: number;
	nbcollab: number;
	status: String;
	contrat: String;
}

@Component({
	selector: 'app-tab-cuid',
	templateUrl: './tab-cuid.component.html',
	styleUrls: ['./tab-cuid.component.scss']
})

export class TabCuidComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  CuidInfos: Cuid[] = [];
  displayedColumns: string[] = ['cuid','contrat', 'nomprenom', 'manager', 'nbapplis', 'nbcollab', 'status'];
  dataSource;
  selection = new SelectionModel<Cuid>(true, []);

  constructor(  private tabCuidService: TabCuidService) {
   }

  ngOnInit() {
    this.tabCuidService.getAllTabCuid()
    .subscribe((data: any) => {
        this.CuidInfos = data;
        console.log(data);
        this.dataSource = new MatTableDataSource<Cuid>(this.CuidInfos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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