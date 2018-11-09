import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 

@Pipe({
  name: 'contratsFiltre',
  pure: false
})

export class FiltreContratsPipe implements PipeTransform {
    transform(value: any[], contrat: string): any[]{
        if(value!== undefined && value!== null && contrat !== undefined && contrat !== null){

            return value.filter( value => value.contrat.nom == contrat);
        }
        return value;
    }
}