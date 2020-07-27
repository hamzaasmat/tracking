import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import { EventEmitter } from '@angular/core';

export enum ConnectionStatusEnum {
    Online,
    Offline
}

export class NetworkConnection {
    public static networkDetection: EventEmitter<boolean> = new EventEmitter();
    public static status: ConnectionStatusEnum = ConnectionStatusEnum.Online;
    private static online$: Observable<any>;
    private static offline$: Observable<any>;

    public static init() {
        NetworkConnection.online$ = Observable.fromEvent(window, 'online');
        NetworkConnection.offline$ = Observable.fromEvent(window, 'offline');

        NetworkConnection.online$.subscribe(e => {
            // console.log('Online');
            NetworkConnection.status = ConnectionStatusEnum.Online;
            this.networkDetection.emit(true);
        });

        NetworkConnection.offline$.subscribe(e => {
            // console.log('Offline');
            NetworkConnection.status = ConnectionStatusEnum.Offline;
            this.networkDetection.emit(false);
        });
    }

    constructor() {
        NetworkConnection.init();
    }

}

new NetworkConnection();