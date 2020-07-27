import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../../services/search.service';
import { WeatherService } from '../../services';

export interface weatherData {
    coord: {
        lon: number,
        lat: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    base: string,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        humidity: number,
        sea_level: number,
        grnd_level: number
    },
    wind: {
        speed: number,
        deg: number
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
    cod: number
}
export interface weather {
    temp: any;
    icon: string;
    dec: string;
}
@Component({
    selector: 'widget-clock',
    templateUrl: './widget_clock.component.html',
    styleUrls: ['./widget_clock.component.scss']
})
export class WidgetClockComponent implements OnInit {
    @Input() isBackground: boolean = true;
    @Input() isMargin: boolean = false;
    livedate: Date;
    liveHoures; liveMin; liveSec;
    liveAmPm: string = "AM";
    isWeatherEnabled: boolean = false;
    weatherData: weather;
    constructor(
        private _weatherService: WeatherService,
    ) {
    }

    ngOnInit() {
        setInterval(() => {
            this.livedate = new Date();
            this.liveHoures = this.livedate.getHours();
            this.liveMin = this.livedate.getMinutes();
            this.liveSec = this.livedate.getSeconds();
            if (this.liveMin < 10) {
                this.liveMin = '0' + this.liveMin
            }
            if (this.liveSec < 10) {
                this.liveSec = '0' + this.liveSec;
            }
            if (this.liveHoures > 12) {
                this.liveAmPm = "PM";
                this.liveHoures -= 12;
                if (this.liveHoures < 10) {
                    this.liveHoures = '0' + this.liveHoures
                }
            }
            else {
                this.liveAmPm = "AM";
            }


        }, 1000);

        // setInterval(() => {
            this.getWeatherData()
        // }, 2000)

    }


    public enableWeather() {
        this.isWeatherEnabled = !this.isWeatherEnabled;
    }
    public getWeatherData() {
        this._weatherService.getWeather().subscribe((response: weatherData) => {
            this.weatherData = {
                temp: Math.floor(response.main.temp) + '°C',
                icon: 'http://openweathermap.org/img/wn/' + response.weather[0].icon + '@2x.png',
                dec: response.weather[0].description
            };

        })
    }

}

