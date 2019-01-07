import { Component, OnInit, ViewChild } from '@angular/core';
import { TabCollaborateurService } from '../services/tab-collaborateur/tab-collaborateur.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

export interface Collaborateur {
	trigrame: string;
	role: String;
	nomprenom: String;
	pays: number;
	nbr_cuid: number;
}


@Component({
  selector: 'app-tab-collaborateur',
  templateUrl: './tab-collaborateur.component.html',
  styleUrls: ['./tab-collaborateur.component.scss']
})
export class TabCollaborateurComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  CollaborateurInfos: Collaborateur[] = [];
  displayedColumns: string[] = ['trigrame','role', 'nomprenom', 'pays', 'nbr_cuid'];
  dataSource;
  selection = new SelectionModel<Collaborateur>(true, []);

  constructor(private tabCollaborateurService: TabCollaborateurService) { }

  ngOnInit() {
    this.tabCollaborateurService.getAllTabCuid()
    .subscribe((data: any) => {
        this.CollaborateurInfos = data;
        console.log(data);
        this.dataSource = new MatTableDataSource<Collaborateur>(this.CollaborateurInfos);
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

  colorCollab(nbrCuid: number): String{
    let classRow: String = '';
    if(nbrCuid > 1) classRow = 'text-danger';
    else if(nbrCuid == 0) classRow = 'text-secondary';
    return classRow;
  }
}
