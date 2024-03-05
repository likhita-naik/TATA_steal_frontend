import { Pipe, PipeTransform } from '@angular/core';
import { timestamp } from 'rxjs';

@Pipe({
  name: 'timeTransform'
})
export class TimeTransformPipe implements PipeTransform {

  transform(value: string|null|undefined, ...args: unknown[]): unknown {
      var newTimeString    
    if(!value){
          newTimeString= ''
         }

         else{
          var timeString=value.split(':')
            newTimeString= Number( timeString[0])>=12?timeString[0]+':'+timeString[1]+' PM':timeString[0]+':'+timeString[1]+' AM'
         }

    return newTimeString;
  }

}
