import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'decimalSeparator'
})
export class DecimalSeparatorPipe implements PipeTransform {
    transform(value: string): string {
        if(value) {
          return value.replace(/,/g, ' ');
        }
        return '';
    }
}