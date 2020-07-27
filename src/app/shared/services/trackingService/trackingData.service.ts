import { Injectable, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from '../../models/tracking';
import { WebsocketService } from './tracking.service';
import { SearchQuery } from '../../models';


@Injectable({
    providedIn: 'root'
})
export class TrackingDataService {
    @Output() positionsUpdated: EventEmitter<any> = new EventEmitter();
    @Output() devicesUpdated: EventEmitter<any> = new EventEmitter();
    public devices = {};
    public positions = {};
    constructor(_socketService: WebsocketService) {
        _socketService.WebSocket.subscribe(
            (dataFromServer) => {
                if (!dataFromServer) {
                    // empty
                }
                else if (dataFromServer.positions) {
                    // positions
                    dataFromServer.positions.forEach(pos => {
                        // console.log('positions from server = ' + JSON.stringify(pos))
                        this.positions[pos.deviceId] = pos;
                    });

                    this.positionsUpdated.emit(true);
                }
                else if (dataFromServer.devices) {
                    // devices
                    dataFromServer.devices.forEach(dev => {
                        this.devices[dev.id] = dev;
                    });

                    // console.log("All devices: " + JSON.stringify(this.devices));

                    
                    // console.log("Searched devices: " + JSON.stringify(searchResults));
                    this.devicesUpdated.emit(true);
                    // console.log('Devices = ' + JSON.stringify(this.devices))
                }
            },
            err => {
                if (err) {
                    // console.log(JSON.stringify(err))
                }
            },
            () => {
                // console.log('Complete')
            }
        )
    }

    getPositionById(id: any) {
        if (this.positions[id]) {
            return this.positions[id];
        }
        else {
            return null;
        }
    }

    getDeviceById(id: any) {
        if (this.devices[id]) {
            return this.devices[id];
        }
        else {
            return null;
        }
    }


}