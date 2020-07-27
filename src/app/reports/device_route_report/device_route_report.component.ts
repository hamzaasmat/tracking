import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, Input, Pipe } from '@angular/core';
import * as map from '../../maps/index';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { DeviceRoute, ToolBar, DeviceConfig, Column, getShortDatePipe, getSpeedPipe } from 'src/app/shared/models';
import { ReportConfigService } from 'src/app/shared/services/reportConfig.service';

import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-device-route-report',
  templateUrl: './device_route_report.component.html',
  styleUrls: ['./device_route_report.component.scss'],
})
export class DeviceRouteReportComponent implements OnInit {
  deviceRouteDetail: DeviceRoute[];
  latLng: any[] = []

  zoom: number = 15;
  @Input() lat: number;
  @Input() lng: number;
  deviceConfig: DeviceConfig;
  name: string;
  curMarker = null;
  indexMatched: number;
  checkMode: string;
  mode: string;
  dark: any;
  
  column: Column[] = [
    { value: 'deviceTime', displayName: 'Device Time', type: 'string', pipe: DatePipe, pipeArgs: ['h:mm a'] },
    { value: 'outdated', displayName: 'Outdated', type: 'string' },
    { value: 'valid', displayName: 'Valid', type: 'string' },
    { value: 'altitude', displayName: 'Altitude', type: 'string' },
    { value: 'speed', displayName: 'Speed', type: 'number', pipe: getSpeedPipe() },
    { value: 'action', displayName: 'Address', type: 'button', icon: 'near_me', action: 'index', color: 'primary' },
  ];

  btnClicked(event){
    this.getAddress(event.element.latitude,event.element.longitude, event.index)
  }


  light: any;
  constructor(
    private authService: AuthService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _layoutService: LayoutService,
    private _dialog: MatDialog,
    private _reportConfigService: ReportConfigService,
  ) { }

  getAddress(lat, lng, i) {
    // alert(lat + ' ' + lon)
    this.indexMatched = i;
    this._reportConfigService.getAddress(lat, lng).subscribe(address => {
      this.curMarker = {
        lat: lat,
        lng: lng,
        address: address.results[0].formatted_address
      }
    })
  }
  ngOnInit() {
    this.checkMode = localStorage.getItem('mode');
    this.dark = map.mapStyle;
    this.light = map.mapLight;
    if (this.checkMode == 'true') {
      this.mode = this.dark
      // alert(this.mode)
    } else {
      this.mode = this.light
    }
    this._layoutService.themeModeDetect.subscribe(res => {
      localStorage.setItem('checkMode', res);
      this.checkMode = localStorage.getItem('checkMode');
      if (this.checkMode == 'true') {
        this.mode = this.dark
      } else {
        this.mode = this.light
      }
    })
    this.name = this._route.snapshot.paramMap.get('name')
    this.deviceConfig = {
      id: this._route.snapshot.paramMap.get('id'),
      from: this._route.snapshot.paramMap.get('from'),
      to: this._route.snapshot.paramMap.get('to')
    }

    this._reportConfigService.setReportConfig(this.deviceConfig)

    var titles: ToolBar = { title: '', subTitle: "Device Route" };
    this._layoutService.setTitlesToolBar(titles);
    this._reportConfigService.getAllRoutes().subscribe((response: any) => {
      this.deviceRouteDetail = response;
      response.forEach(element => {
        this.lat = element.latitude;
        this.lng = element.longitude;
        if (this.latLng.length == 0) {
          this.latLng.push({ lat: element.latitude, lng: element.longitude });
        } else {
          if (this.latLng[this.latLng.length - 1].lat != element.latitude || this.latLng[this.latLng.length - 1].lng != element.longitude) {
            this.latLng.push({ lat: element.latitude, lng: element.longitude });
          } else {
            // console.log('skipped!')
          }
        }

      });
    })
  }
  toggleFullScreen() {
    let elem = document.body;
    let methodToBeInvoked = elem.requestFullscreen ||
      elem['webkitRequestFullScreen'] || elem['mozRequestFullscreen'] ||
      elem['msRequestFullscreen'];
    if (methodToBeInvoked) methodToBeInvoked.call(elem);

  }
}
