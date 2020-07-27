import { Injectable } from '@angular/core';
import { RestService } from '../RestService.service';
import { Observable, Subject, Observer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket'
import { Message } from '../../models/tracking';


@Injectable({
    providedIn: 'root'
})
export class WebsocketService extends RestService {

    public SOCKET_URL = '/api/socket';
    public url = this.endPoint.replace('http', 'ws') + this.SOCKET_URL;
    WebSocket: WebSocketSubject<any> = webSocket(this.url);

}