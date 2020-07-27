import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedConverter'
})
export class SpeedConvertorPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return (value * (1.852)).toFixed(1) + ' km / h';
    }

}
