import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emptyString',
})
export class EmptyStringPipe implements PipeTransform {
  transform(value?: string, ...args: unknown[]): unknown {
    const emptyString = args.length === 0 ? 'Inconnu' : args[0];
    return value === undefined || value.length === 0 ? emptyString : value;
  }
}
