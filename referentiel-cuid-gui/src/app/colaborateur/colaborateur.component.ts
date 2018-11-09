import { Component, OnInit } from '@angular/core';
import { CollaborateurService } from '../services/collaborateurs/collaborateur.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocalisationService } from '../services/localisation/localisation.service';
import swal from 'sweetalert2';
import * as $ from 'jquery';
import 'jquery';
import 'bootstrap';

@Component({
    selector: 'app-colaborateur',
    templateUrl: './colaborateur.component.html',
    styleUrls: ['./colaborateur.component.scss']
})
export class ColaborateurComponent implements OnInit {
    Collaborateurs = [];  //Liste de collaborateurs
    localisations = []; //Liste de localisation
    collaborateurForm: FormGroup; //Formulaire collaborateurs
    localisationForm: FormGroup; //Formulaire localisation

    constructor(
        private formBuilder: FormBuilder,
        private collabService: CollaborateurService,
        private localisationService: LocalisationService
    ) {
        //Formulaire ajouter Collaborateur
        this.collaborateurForm = this.formBuilder.group({
            trigrame: [null, [Validators.maxLength(3)]],
            nom: [null, [Validators.required]],
            prenom: [null, [Validators.required]],
            localisation: [null, [Validators.required]]
        });
        //Appel table localisation
        this.localisationService.getLocalisations()
            .subscribe((data: any) => {
                this.localisations = data;
            });
        // Formulaire Ajouter nouvelle localisation 
        this.localisationForm = this.formBuilder.group({
            pays: [null, [Validators.nullValidator]]
        });
        this.localisationService.getLocalisations()
            .subscribe((data: any) => {
                this.localisations = data;
            });
    }

    ngOnInit() {
        //Appel à tous les collaborateurs
        this.collabService.getAllCollabs()
            .subscribe((data: any) => {
                this.Collaborateurs = data;
            });

        //Appel à localisation
        this.localisationService.getLocalisations()
            .subscribe((data: any) => {
                this.localisations = data;
            });
    }

    onSubmit() {
        //Envoi de formulaire collaborateur
        let params = this.collaborateurForm.value;
        params.localisation = {
            id: params.localisation
        };
        console.log(params);
        this.collabService.addCollab(params)
            .subscribe((data: any) => {
                swal('Collaborateur bien ajouté', '', 'success');
            }, (err) => {
                swal('Erreur', '', 'error');
            });
    }

    //Ajouter localisation
    ajouterLocalisation = () => {
        console.log(this.localisationForm.value);
        this.localisationService.addLocalisation(this.localisationForm.value)
            .subscribe((local: any) => {
                this.localisationService.getLocalisations()
                    .subscribe((data: any) => {
                        this.localisations = data;
                        console.log(local);
                        this.collaborateurForm.patchValue({
                            localisation: local.id
                        });
                        console.log(this.collaborateurForm.value);
                        $('#myModal').modal('hide');
                    }, (err) => {
                        swal('erreur', '', 'error');
                    });
            })
    }

    //Aperture du modal pour l'ajout de localisation
    openModal = () => {
        $('#myModal').modal('show');
    }
}
