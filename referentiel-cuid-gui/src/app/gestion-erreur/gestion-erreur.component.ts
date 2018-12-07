import { Component, OnInit } from '@angular/core';
import { ErrorHandler, Injectable} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gestion-erreur',
  templateUrl: './gestion-erreur.component.html',
  styleUrls: ['./gestion-erreur.component.scss']
})

@Injectable()
export class GestionErreurComponent implements ErrorHandler {

  handleError(error: any) {  
    
    console.log(error.status);

    if (error instanceof HttpErrorResponse) {
      //Backend returns unsuccessful response codes such as 404, 500 etc.				  
      console.error('Backend returned status code: ', error.status);
      console.error('Response body:', error.message);          	  
  } else {
      //A client-side or network error occurred.	          
      console.error('An error occurred:', error.message);          
  } 
  }

}
