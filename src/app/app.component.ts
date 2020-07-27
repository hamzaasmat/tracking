import { Component, Inject, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { CookieService } from 'ngx-cookie-service'
import { NetworkConnection, ConnectionStatusEnum } from './shared/services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Output() modeChanged: EventEmitter<any> = new EventEmitter();
  setDarKMode: any;
  mode: any;
  netWorkDetection: boolean;
  startPortal: boolean;
  constructor(
    private overlayContainer: OverlayContainer,
    private _cookieService: CookieService,
  ) {


  }

  ngOnInit() {

    NetworkConnection.networkDetection.subscribe(res => {
      
      this.netWorkDetection = res;
    })
    this.mode = localStorage.getItem('mode');
    if (this.mode == 'true') {
      this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
    }

  }
  toggle() {
    this.setDarKMode = !this.setDarKMode;
  }
  hideStartPortal() {
    this.startPortal = !this.startPortal
  }
  getMode(value) {
    this.setDarKMode = value;
    this.mode = localStorage.getItem('mode');
    if (this.mode == 'true') {
      this.overlayContainer.getContainerElement().classList.add('unicorn-dark-theme');
    } else {
      this.overlayContainer.getContainerElement().classList.remove('unicorn-dark-theme');
    }

  }
}
