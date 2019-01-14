//Imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, ROUTES, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { ErrorHandler} from '@angular/core';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { AccueilComponent } from './accueil/accueil.component';
import { CollaborateurService } from './services/http/collaborateurs/collaborateur.service';
import { CuidService } from './services/http/cuid/cuid.service';
import { HttpClientModule } from '@angular/common/http'; 
import { LocalisationService } from './services/http/localisation/localisation.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { FormWizardModule } from 'angular2-wizard';
import { FiltreContratsPipe } from './pipes/filtreContrats.pipe';
import { TabCuidComponent } from './tab-cuid/tab-cuid.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';



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
  MatDialogModule,
  MatTabsModule,
  MatBadgeModule
  
} from '@angular/material';
import { CreationCuidComponent } from './creation-cuid/creation-cuid.component';
import { OutilsModalComponent } from './modals/outils/outils.component';
import { TabCollaborateurComponent } from './tab-collaborateur/tab-collaborateur.component';
import { ApplicationsModalComponent } from './modals/applications/applications.component';
import { FicheCuidComponent } from './fiche-cuid/fiche-cuid.component';
import { CreationCollaborateurComponent } from './creation-collaborateur/creation-collaborateur.component';
import { LoginComponent } from './login/login.component';
import { GestionComponent } from './gestion/gestion.component';
import { HomeComponent } from './home/home.component';
import { FicheCollaborateurComponent } from './fiche-collaborateur/fiche-collaborateur.component';
import { LocalisationModalComponent } from './modals/localisation/localisation.component';
import { DateCollabModalComponent } from './modals/date-collab/date-collab.component';
import { GestionErreurComponent } from './gestion-erreur/gestion-erreur.component';

//Routage
let routes: Routes = [{
  path: 'accueil/:contrat',
  component: AccueilComponent
},{
  path: 'accueil',
  component: AccueilComponent
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
  path: 'ficheCuid/:cuid',
  component: FicheCuidComponent
},{
  path: 'creationCollaborateur',
  component: CreationCollaborateurComponent
},{
  path: 'login',
  component: LoginComponent
},{
  path: 'gestion',
  component: GestionComponent
},{
  path: 'ficheCollaborateur/:trigrame',
  component: FicheCollaborateurComponent
},{
  path: 'home',
  component: HomeComponent
},{
  path: '**',
  redirectTo: 'home'
}
];
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    AccueilComponent,
    FiltreContratsPipe,
    TabCuidComponent,
    CreationCuidComponent,
    OutilsModalComponent,
    TabCollaborateurComponent,
    ApplicationsModalComponent,
    FicheCuidComponent,
    CreationCollaborateurComponent,
    LoginComponent,
    GestionComponent,
    HomeComponent,
    FicheCollaborateurComponent,
    LocalisationModalComponent,
    DateCollabModalComponent,
    GestionErreurComponent
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
    MatDialogModule,
    MatTabsModule,
    MatBadgeModule
  ],
  providers: [
              {provide: ErrorHandler,
              useClass: GestionErreurComponent}
  ], 
  
  bootstrap: [AppComponent],

  entryComponents: [OutilsModalComponent, ApplicationsModalComponent, LocalisationModalComponent, DateCollabModalComponent]
  
})
export class AppModule { }
