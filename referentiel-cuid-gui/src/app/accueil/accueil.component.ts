import { Component, OnInit } from '@angular/core';
import { CuidService } from '../services/http/cuid/cuid.service';
import { Subject } from 'rxjs';
import swal from 'sweetalert2';
import { query } from '@angular/core/src/render3/query';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
    selector: 'app-accueil',
    templateUrl: './accueil.component.html',
    styleUrls: ['./accueil.component.scss']
})

export class AccueilComponent implements OnInit {
    cuids = [];
    dtTrigger: Subject<any> = new Subject();
    contrat=null;

    constructor(
        private cuidService: CuidService,
        private route: ActivatedRoute,
        private router: Router
    ) {

        this.router.events.subscribe((event) => {
            this.contrat = this.route.snapshot.params['contrat'];
        });
     }

    ngOnInit() {
        this.getAllCuid();
    }

    delete(cuid) {
        swal({
            title: 'Etes-vous sure de supprimer le CUID?',
            text: "Vous ne pouvez pas revenir en arrière!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.value) {
                this.cuidService.deleteCuid(cuid)
                    .subscribe((data: any) => {
                        this.cuidService.getCuids().subscribe((data: any) => {
                            this.cuids = data;
                            
                        });
                        swal(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )
                    });
            }
        })
    }

    getAllCuid = () => {
        this.cuidService.getCuids().subscribe((data: any) => {
            this.cuids = data;
            this.dtTrigger.next();
        });
    }



}
