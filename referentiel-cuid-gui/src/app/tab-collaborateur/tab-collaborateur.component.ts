//angular
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';

//services
import { CollaborateurService } from '../services/http/collaborateurs/collaborateur.service';

// interfaces
import {CollaborateurInfo} from '../interfaces/collaborateur-info';


export interface CollaborateurTab {

  trigrame: String;
  role: String;
  nomprenom: String;
  pays: String;
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

  collaborateurTab: CollaborateurTab[] = [];
  CollaborateurInfos: CollaborateurInfo[] = [];
  displayedColumns: string[] = ['collaborateurs.trigrame','collaborateurs.role', 'collaborateurs.nom', 'collaborateurs.localisation.pays', 'nbr_cuid'];
  dataSource;
  selection = new SelectionModel<CollaborateurInfo>(true, []);

  constructor(private collaborateurService: CollaborateurService) { }

  ngOnInit() {
    this.collaborateurService.getTabCollaborateur()
    .subscribe((data: any) => {
/*


      data.forEach(element => {
        this.collaborateurTab.push(
          trigrame: data.collaborat

        )
      });
*/


       this.CollaborateurInfos = data;
        //console.log(data);
        this.dataSource = new MatTableDataSource<CollaborateurInfo>(this.CollaborateurInfos);

        this.dataSource.sortingDataAccessor = (item, property) => {

          switch(property){
            case 'collaborateurs.trigrame': return item.collaborateurs.trigrame;
            case 'collaborateurs.role': return item.collaborateurs.role;
            case 'collaborateurs.nom': return item.collaborateurs.nom;
            case 'collaborateur.localisation.pays': return item.collaborateurs.localisation.pays;
            default: return item[property];
          }
        }

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
