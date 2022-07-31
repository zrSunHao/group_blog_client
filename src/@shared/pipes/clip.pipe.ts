import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clip'
})
export class ClipPipe implements PipeTransform {

  transform(value: string, limit = 10, ellipsis = '...'): any {
    if(value == null) return;
    return value.length > limit ? value.substr(0, limit-1) + ellipsis : value;
  }

}
