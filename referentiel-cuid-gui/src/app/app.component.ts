import { Component } from '@angular/core';

import {SharedService} from './services/shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private sharedService: SharedService){

    this.sharedService.notify({name: 'John'})
  }

message = "hello world";

}
