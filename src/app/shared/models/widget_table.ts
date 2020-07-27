import { Pipe } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SpeedConvertorPipe, DistanceConvertorPipe, MillisecondsTimeConverterPipe } from '../filters';

export var getShortDatePipe = function () {
    var dateShortPipe = DatePipe;
    dateShortPipe.arguments = 'short';
    return dateShortPipe;
};

export function getSpeedPipe() {
    return SpeedConvertorPipe;
}
export function getDistancePipe() {
    return DistanceConvertorPipe;
}
export function getDurationPipe() {
    return MillisecondsTimeConverterPipe;
}

export interface Column {
    displayName: string;
    value: string;
    type: 'string' | 'number' | 'button' | 'customValue';
    pipe?: Pipe;
    pipeArgs?: string[];
    action?: 'index' | 'element';
    image?: string;
    icon?: string;
    color?: string;
    customValue?: any;
}