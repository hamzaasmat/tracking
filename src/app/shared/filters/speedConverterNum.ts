import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'speedConverterNum'
})
export class SpeedConvertorNumPipe implements PipeTransform {

    transform(value: any, args?: any): any {
        return (value * (1.852)).toFixed(1);
    }

}
