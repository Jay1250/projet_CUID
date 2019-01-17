//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

//services
import { CollaborateurService } from '../services/http/collaborateurs/collaborateur.service';

// interfaces
import {Collaborateur} from '../interfaces/collaborateur';

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

  constructor(private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    this.collaborateurService.getTabCollaborateur()
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
