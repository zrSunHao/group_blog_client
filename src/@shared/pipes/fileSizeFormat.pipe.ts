import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSizeFormat'
})
export class FileSizeFormatPipe implements PipeTransform {

  transform(value: number, args?: any): string {
    return this._format(value);
  }

  private _format(size: number): string {
    if (size <= 0) {
      return '0 Bytes';
    }
    const unit = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const idx = Math.floor(Math.log(size) / Math.log(1024));
    const s: number = size / Math.pow(1024, idx);
    return `${s.toFixed(2)} ${unit[idx]}`;
  }

}