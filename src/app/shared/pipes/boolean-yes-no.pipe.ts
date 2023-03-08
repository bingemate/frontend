import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanYesNo',
})
export class BooleanYesNoPipe implements PipeTransform {
  transform(value?: boolean | null): unknown {
    if (!value) return 'Non';
    return value ? 'Oui' : 'Non';
  }
}
