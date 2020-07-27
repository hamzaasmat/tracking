import { Injectable, EventEmitter } from '@angular/core';
import { RestService } from './RestService.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    public relativeUrl = 'https://openweathermap.org/data/2.5/weather?q=lahore,pk&units=metric&appid=b6907d289e10d714a6e88b30761fae22'
    constructor(
        private http: HttpClient,
    ) { }

    getWeather(): Observable<any> {
        return this.http.get(this.relativeUrl)
    }
}

