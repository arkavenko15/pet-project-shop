import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice'
})
export class FormatPricePipe implements PipeTransform {

  transform(value: any): string {
    value = parseFloat(value)
    return value.toFixed(2)
  }

}
