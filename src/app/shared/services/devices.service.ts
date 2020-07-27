import { Injectable } from '@angular/core';
import { RestService } from './RestService.service';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddEditModel } from '../models';

@Injectable({
    providedIn: 'root'
})
export class DeviceService extends RestService {

    public relativeUrl: string = '/api/devices';

    public getAllDevices() {
        return this.get(this.relativeUrl, this.headers())
    }

    public updateDevice(id: number, model: any): Observable<any> {
        let headers = {
            'Content-Type': 'application/json',
        }
        var body = JSON.stringify({
            id: model.id,
            name: model.name,
            uniqueId: model.uniqueId,
            model: model.model,
            contact: model.contact,
            category: model.category,
        })
        return this.put(this.relativeUrl + `/${model.id}`, body, headers);
    }

    public addDevice(model: any): Observable<any> {
        let headers = {
            'Content-Type': 'application/json'
        }
        var body = JSON.stringify({
            id: 130,
            name: 'test device',
            uniqueId: 123,
            model: 'null',
            contact: '12345',
            category: 'test',
        })
        return this.post(this.relativeUrl, JSON.stringify(model), headers);
    }

    public deleteDevice(id: number): Observable<any> {
        let headers = {
            'Content-Type': 'application/json'
        }
        return this.delete(this.relativeUrl + `/${id}`, headers);
    }



}
