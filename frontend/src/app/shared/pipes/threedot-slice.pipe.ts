import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'threedotSlice'
})
export class ThreedotSlicePipe implements PipeTransform {

  private readonly allowedLength = 100;

  transform(value: unknown, ...args: unknown[]): unknown {
    if (typeof value !== 'string') {
      console.log("wrong pipe usage, expected input type is string")
      return value;
    }

    return value.length > this.allowedLength
      ? value.slice(0, this.allowedLength) + '...'
      : value;
  }

}
