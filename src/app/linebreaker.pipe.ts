import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'linebreaker'
})
export class LinebreakerPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\n/g, '<br>');
  }

}
