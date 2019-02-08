//angular
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

//services
import { ContratService } from '../services/http/contrat/contrat.service';
import {NavbarService} from '../services/navbar/navbar.service';

//others
import { Subject } from 'rxjs';

@Component({
  selector: 'menu-cuid',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dtTrigger: Subject<any> = new Subject();
  champContrat=null;
  contrats = [];

  faCoffee = "faCoffee";

  constructor(private contratService: ContratService, 
              private router: Router,
              private nav: NavbarService              
              ) { }

  ngOnInit() {
  
    this.getAllContrats();
  }

  getAllContrats = () => {
    this.contratService.getContrats().subscribe((data: any) => {
        this.contrats = data;
        this.dtTrigger.next();
        this.champContrat = this.contrats[0].nom; 
    });
}

  onValider(){
    this.router.navigateByUrl('/accueil/' + this.champContrat);
  }
}
