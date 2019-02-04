//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

//services
import { CollaborateurService } from '../services/http/collaborateurs/collaborateur.service';

// interfaces
import {CollaborateurTab} from '../interfaces/collaborateur-tab';

@Component({
  selector: 'app-tab-collaborateur',
  templateUrl: './tab-collaborateur.component.html',
  styleUrls: ['./tab-collaborateur.component.scss']
})
export class TabCollaborateurComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  collaborateurTab: CollaborateurTab[] = [];
  displayedColumns: string[] = ['trigrame','role', 'nomprenom', 'pays', 'nbr_cuid'];
  dataSource;
  selection = new SelectionModel<CollaborateurTab>(true, []);

  constructor(private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    this.collaborateurService.getTabCollaborateur()
    .subscribe((data: any) => {
      this.collaborateurTab = data;
      this.dataSource = new MatTableDataSource<CollaborateurTab>(this.collaborateurTab);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    console.log(this.dataSource);
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
