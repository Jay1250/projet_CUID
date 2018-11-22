//Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { ColaborateurComponent } from './colaborateur/colaborateur.component';
import { MenuComponent } from './menu/menu.component';
import { CuidComponent } from './cuid/cuid.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConsulterCUIDComponent } from './consulter-cuid/consulter-cuid.component';
import { CollaborateurService } from './services/collaborateurs/collaborateur.service';
import { CuidService } from './services/cuid/cuid.service';
import { HttpClientModule } from '@angular/common/http'; 
import { LocalisationService } from './services/localisation/localisation.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { HistoriqueComponent } from './historique/historique.component';
import { HistoriqueService } from './services/historique/historique.service';
import { FormWizardModule } from 'angular2-wizard';
import { FiltreContratsPipe } from './pipes/filtreContrats.pipe';
import { TabCuidComponent } from './tab-cuid/tab-cuid.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { TestComponent } from './test/test.component';

import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatTableModule,
  MatSortModule,
  MatChipsModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatListModule,
  MatDialogModule
  
} from '@angular/material';
import { CreationCuidComponent } from './creation-cuid/creation-cuid.component';
import { OutilsModalComponent } from './modals/outils/outils.component';
import { TabCollaborateurComponent } from './tab-collaborateur/tab-collaborateur.component';
import { ApplicationsModalComponent } from './modals/applications/applications.component';




//Routage
let routes: Routes = [{
  path: 'cuid',
  component: CuidComponent
}, {
  path: 'collaborateur',
  component: ColaborateurComponent
},  {
  path: 'accueil/:contrat',
  component: AccueilComponent
},{
  path: 'accueil',
  component: AccueilComponent
}, {
  path: 'cuid/:id',
  component: ConsulterCUIDComponent
}, {
  path: 'historique',
  component: HistoriqueComponent
}, {
  path: 'test',
  component: TestComponent
},{
  path: 'tabCuid',
  component: TabCuidComponent
},{
  path: 'creationCuid',
  component: CreationCuidComponent
},{
  path: 'tabCollaborateur',
  component: TabCollaborateurComponent
},{
  path: '**',
  redirectTo: 'accueil'
}
];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CuidComponent,
    ColaborateurComponent,
    AccueilComponent,
    ConsulterCUIDComponent,
    HistoriqueComponent,
    FiltreContratsPipe,
    TestComponent,
    TabCuidComponent,
    CreationCuidComponent,
    OutilsModalComponent,
    TabCollaborateurComponent,
    ApplicationsModalComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    AngularFontAwesomeModule,
    FormWizardModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    }),
    BrowserAnimationsModule,
  

    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [CollaborateurService, CuidService, LocalisationService, HistoriqueService], 
  
  bootstrap: [AppComponent],

  entryComponents: [OutilsModalComponent, ApplicationsModalComponent]
  
})
export class AppModule { }
