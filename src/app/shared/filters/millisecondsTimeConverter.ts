import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'millisecondsTimeConverter'
})
export class MillisecondsTimeConverterPipe implements PipeTransform {

    convertToTime(value) {
        var hours = Math.floor(value / 3600);
        var minutes = Math.floor((value % 3600) / 60);
        var seconds = Math.floor((value % 3600) % 60);
        return `${hours} h ${minutes} m ${seconds} s`;
    }

    transform(value: any, args?: any): any {
        var timeInSeconds = parseInt(value) / 1000;
        return this.convertToTime(timeInSeconds);
    }

}
