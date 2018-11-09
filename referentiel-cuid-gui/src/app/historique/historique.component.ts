import { Component, OnInit } from '@angular/core';
import { HistoriqueService } from '../services/historique/historique.service';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-historique',
    templateUrl: './historique.component.html',
    styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

    historiques = [];

    dtTrigger: Subject<any> = new Subject();

    constructor(
        private historiqueService: HistoriqueService,
        private route: ActivatedRoute

    ) { }

    ngOnInit() {
        this.historiqueService.getHistorique()
            .subscribe((data: any) => {
                this.historiques = data;
                setTimeout(() => {
                    this.dtTrigger.next();
                }, 0)
            })
    }
}
