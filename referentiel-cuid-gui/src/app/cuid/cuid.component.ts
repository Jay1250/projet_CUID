import { Component, OnInit } from '@angular/core';
import { CuidService } from '../services/cuid/cuid.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CollaborateurService } from '../services/collaborateurs/collaborateur.service';
import { ApplicationService } from '../services/application/application.service';
import { ContratService } from '../services/contrat/contrat.service';
import { OutilService } from '../services/outil/outil.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-cuid',
    templateUrl: './cuid.component.html',
    styleUrls: ['./cuid.component.scss']
})

export class CuidComponent implements OnInit {

    Ccuid = [];
    cuidForm: FormGroup;
    collabForm: FormGroup;
    test: FormGroup;
    collabs = [];
    apps = [];
    outils = [];
    contrats = [];
    constructor(
        private cuidService: CuidService,
        private formBuilder: FormBuilder,
        private collabService: CollaborateurService,
        private appService: ApplicationService,
        private outilService: OutilService,
        private contratService: ContratService
    ) {

        this.cuidForm = this.formBuilder.group({
            contrat: [null, [Validators.nullValidator]],
            cuid: [null, [Validators.nullValidator]],
            prenom: [null, [Validators.nullValidator]],
            nom: [null, [Validators.nullValidator]],
            mdp: [null, [Validators.nullValidator]],
            status: [null, [Validators.nullValidator]],
            nomgir: [null, [Validators.nullValidator]],
            prenomgir: [null, [Validators.nullValidator]],
            commentaires: [null, [Validators.nullValidator]],
            applications: [null, [Validators.nullValidator]],
            outil: [null, [Validators.nullValidator]]
        });
        this.test = new FormGroup({
            firstName: new FormControl()
         });
    }

    ngOnInit() {
        this.cuidService.getAllCuid()
            .subscribe((data: any) => {
                this.Ccuid = data;
            });
        this.collabService.getAllCollabs()
            .subscribe((data: any) => {
                this.collabs = data;
            });
        // this.appService.getApplication()
        //     .subscribe((data: any) => {
        //         this.apps = data;
        //     });
        this.outilService.getOutil()
            .subscribe((data: any) => {
                this.outils = data;
            });
        this.contratService.getAllContrats()
            .subscribe((data: any) => {
                this.contrats = data;
                console.log(data);
            });
    }
    onSubmit() {
        let params = this.cuidForm.value;
        if (!(typeof params.contrat === "object") && (params.contrat !== null)) {
            params.contrat = {
                id: params.contrat
            };
        }

        console.log(params);
        let cuid = {
            contrat: params.contrat,
            cuid: params.cuid,
            prenom: params.prenom,
            nom: params.nom,
            mdp: params.mdp,
            status: params.status,
            nomgir: params.nomgir,
            prenomgir: params.prenomgir,
            commentaires: params.commentaires,
            applications: params.applications,
            outil: params.outil
        }
        this.cuidService.addCuid(cuid)
            .subscribe((data: any) => {
                swal('Cuid bien ajouté', '', 'success');
            }, (err) => {
                swal('Erreur', ' Cuid non ajouté ', 'error');
            });
    }

    contratChange = () => {
        this.apps = this.cuidForm.value.contrat.applications;
    }

    
}


