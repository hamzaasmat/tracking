import { Injectable, EventEmitter } from '@angular/core';
import { RestService } from './RestService.service';
import { DeviceConfig, DeviceCoordinates, IUsers } from '../models/index';

@Injectable({
    providedIn: 'root'
})
export class ReportConfigService extends RestService {

    private relativeUrl: string = '/api/reports/';
    private relativeUrlEnd: string = '/api/';
    data: DeviceConfig = {
        id: null,
        from: '',
        to: ''
    }
    DevicePositions: DeviceCoordinates = {
        id: null,
        lat: null,
        lng: null
    }
    params: DeviceConfig;
    configDataEmiter: EventEmitter<DeviceConfig> = new EventEmitter();
    devicePositionEmiter: EventEmitter<any> = new EventEmitter();

    public setData(data: any) {
        this.data = data;
    }
    public getData() {
        return this.data;
    }

    public setReportConfig(data: DeviceConfig) {
        this.data = data
        this.configDataEmiter.emit(this.data)
    }
    public getReportConfig() {
        return this.data;
    }
    public getAllRoutes() {
        let data = this.getReportConfig()
        let headers = this.headers({ id: data.id, from: data.from, to: data.to })
        return this.get(this.relativeUrl + 'route', headers)
    }
    public getAllEvents() {
        let data = this.getReportConfig()
        let headers = this.headers({ id: data.id, from: data.from, to: data.to })
        return this.get(this.relativeUrl + 'events', headers)
    }
    public getAllTrips() {
        let data = this.getReportConfig()
        let headers = this.headers({ id: data.id, from: data.from, to: data.to })
        return this.get(this.relativeUrl + 'trips', headers)
    }
    public getAllStops() {
        let data = this.getReportConfig()
        let headers = this.headers({ id: data.id, from: data.from, to: data.to })
        return this.get(this.relativeUrl + 'stops', headers)
    }
    public getAllSummary() {
        let data = this.getReportConfig()
        let headers = this.headers({ id: data.id, from: data.from, to: data.to })
        return this.get(this.relativeUrl + 'summary', headers)
    }
    public setDevicePosition(data: DeviceCoordinates) {
        this.DevicePositions = data;
        this.devicePositionEmiter.emit(this.DevicePositions)
    }
    public getDeviceCoordinates() {
        this.configDataEmiter.emit(this.data)
        return this.get(this.relativeUrlEnd + 'positions', this.headers())
    }
    public getAllStats() {
        let data = this.getReportConfig()
        let headers = this.headers({ from: data.from, to: data.to })
        return this.get(this.relativeUrlEnd + 'statistics', headers)
    }
    public getAddress(lat, lon) {
        // alert('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyAqg28Lg8qNeQIGohbFbLxykWGx1ppQtG0')
        return this.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=AIzaSyAqg28Lg8qNeQIGohbFbLxykWGx1ppQtG0', null, true);
    }

}
