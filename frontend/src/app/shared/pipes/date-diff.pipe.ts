import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'dateDiff'
})
export class DateDiffPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    if (!value) {
      return value;
    }

    let dt1 = new Date();
    let dt2 = new Date(value as string);
    const diffInMinutes
      = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate(), dt2.getHours(), dt2.getMinutes()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(), dt1.getHours(), dt1.getMinutes())) / (1000 * 60))

    return Math.abs(diffInMinutes) + ' Minutes';
  }

}
