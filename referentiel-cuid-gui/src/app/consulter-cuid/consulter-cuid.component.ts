import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { CuidService } from '../services/cuid/cuid.service';
import { CollaborateurService } from '../services/collaborateurs/collaborateur.service';
import { AffectationsService } from '../services/affectations/affectations.service';
import { ContratService } from '../services/contrat/contrat.service'
import swal from 'sweetalert2';



@Component({
    selector: 'app-consulter-cuid',
    templateUrl: './consulter-cuid.component.html',
    styleUrls: ['./consulter-cuid.component.scss']

})
export class ConsulterCUIDComponent implements OnInit {

    editForm: FormGroup;
    collabForm: FormGroup;
    Collaborateurs = [];
    contrats = [];
    isUpdate = false;
    cuid: any = {
        contrat: {},
        application: [],
        collaborateurs: [],
    };
    cuid2: any;
    dtTrigger: Subject<any> = new Subject();
    constructor(
        private route: ActivatedRoute,
        private cuidService: CuidService,
        private collabService: CollaborateurService,
        private formBuilder: FormBuilder,
        private affectationService: AffectationsService,
        private contratService: ContratService
    ) {
        // Formulaire pour ajouter nouvelle collaborateur 
        this.collabForm = this.formBuilder.group({
            trigrame: [null, [Validators.nullValidator]],
            dateaffectation: [null, [Validators.nullValidator]],
            dateliberation: [null, [Validators.nullValidator]]
        });

        //Appel tous les contrats
        this.contratService.getAllContrats()
            .subscribe((data: any) => {
                this.contrats = data;
            })
    }

    ngOnInit() {
        this.collabService.getAllCollabs()
            .subscribe((data: any) => {
                this.Collaborateurs = data;
            });

        //Validation formulaire
        this.route.params.subscribe(params => {
            this.cuidService.findById(params.id)
                .subscribe((data: any) => {
                    this.cuid = data;
                    this.editForm = this.formBuilder.group({
                        contrat: [{ value: this.cuid.contrat, disabled: true }, [Validators.required]],
                        cuid: [{ value: this.cuid.cuid, disabled: true }, [Validators.required]],
                        prenom: [this.cuid.prenom, [Validators.nullValidator]],
                        nom: [this.cuid.nom, [Validators.nullValidator]],
                        mdp: [this.cuid.mdp, [Validators.nullValidator]],
                        status: [this.cuid.status, [Validators.nullValidator]],
                        nomgir: [this.cuid.nomgir, [Validators.nullValidator]],
                        prenomgir: [this.cuid.prenomgir, [Validators.nullValidator]],
                        commentaires: [this.cuid.commentaires, [Validators.nullValidator]]
                    })
                    setTimeout(() => {
                        this.dtTrigger.next();
                    }, 0)
                })
        });
    }

    // Delete collaborateur 
    delete = (trigrame) => {
        swal({
            title: 'Etes-vous sure de supprimer le Collaborateur?',
            text: "Vous ne pouvez pas revenir en arrière!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Supprimer'
        }).then((result) => {
            if (result.value) {
                let cuidcollaborateurId = {
                    cuid: this.cuid.cuid,
                    trigrame: trigrame
                }
                this.affectationService.deleteAffectation(cuidcollaborateurId)
                    .subscribe((data: any) => {
                        swal('Collaborateur supprimé', '', 'success');
                        this.cuidService.findById(this.cuid.cuid)
                            .subscribe((data: any) => {
                                this.cuid = data;
                            })
                    }, (err) => {
                        swal('Collaborateur non supprimé', err.message, 'error');
                    })

            }
        })
    }

    // Formulaire Ajouter nouvelle collaborateur 
    ajouterCollaborateur = () => {
        let formValue = this.collabForm.value;
        let cuidcollab = {
            cuidcollaborateurId: {
                cuid: this.cuid.cuid,
                trigrame: formValue.trigrame
            },
            dateaffectation: formValue.dateaffectation,
            dateliberation: formValue.dateliberation
        };
        console.log(cuidcollab);
        this.affectationService.addAffectations(cuidcollab)
            .subscribe((data: any) => {
                swal('Collaborateur bien affecté', '', 'success');
                this.cuidService.findById(this.cuid.cuid)
                    .subscribe((data: any) => {
                        this.cuid = data;
                        $('#affectationModal').modal('hide');
                    })
            }, (err) => {
                swal(err.message, '', 'error');
                $('#affectationModal').modal('hide');
            })
    }

    openModal = () => {
        $('#affectationModal').modal('show');
    }

    startEdit = () => {
        this.isUpdate = !this.isUpdate;
    }

    update = () => {
        this.cuid2 = this.editForm.getRawValue();
        this.cuidService.update(this.cuid2)
            .subscribe((data: any) => {
                this.cuid = data;
                swal('Modification effectuée', '', 'success');
            }, (err) => {
                swal('Modification non effectuée', '', 'error');
            });
        this.startEdit();
    }

}