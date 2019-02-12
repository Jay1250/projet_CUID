//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

//services
import { CuidService } from '../services/http/cuid/cuid.service';
import { CookieService } from 'ngx-cookie-service';

//interfaces
import {CuidTab} from '../interfaces/cuid-tab';

@Component({
	selector: 'app-tab-cuid',
	templateUrl: './tab-cuid.component.html',
	styleUrls: ['./tab-cuid.component.scss']
})

export class TabCuidComponent implements OnInit {

  cuidTab: CuidTab[] = [];
  displayedColumns: string[] = ['cuid','contrat', 'nomprenom', 'manager', 'nbapplis', 'nbcollab', 'status'];

  dataSource: MatTableDataSource<CuidTab>;
  selection = new SelectionModel<CuidTab>(true, []);
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(  private cuidService: CuidService,
                private cookieService: CookieService
            ) {
   }

  ngOnInit() {
    this.cuidTab = [];
    if(this.cookieService.get('Contrat') == 'tous'){
      this.cuidService.getTabCuid()
      .subscribe((data: any) => {
        this.cuidTab = data;
        this.dataSource = new MatTableDataSource<CuidTab>(this.cuidTab);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
    else{
      this.cuidService.getTabCuidByContrat(this.cookieService.get('Contrat'))
      .subscribe((data: any) => {
        this.cuidTab = data;
        this.dataSource = new MatTableDataSource<CuidTab>(this.cuidTab);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });

    }
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