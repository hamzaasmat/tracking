import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, Input, Pipe } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { DeviceRoute, ToolBar, DeviceConfig, Column, getShortDatePipe, getSpeedPipe, DeviceEvents } from 'src/app/shared/models';
import { ReportConfigService } from 'src/app/shared/services/reportConfig.service';

import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-device-route-report',
  templateUrl: './device_events_report.component.html',
  styleUrls: ['./device_events_report.component.scss'],
})
export class DeviceEventsReportComponent implements OnInit {
  deviceEventsDetail: DeviceEvents[];
  deviceConfig: DeviceConfig;
  name: string;
  indexMatched: number;

  column: Column[] = [
    { value: 'serverTime', displayName: 'Time', type: 'string', pipe: DatePipe, pipeArgs: ['medium'] },
    { value: 'type', displayName: 'Type', type: 'string' },
    { value: 'geofenceId', displayName: 'Geofence', type: 'string' },
    { value: 'maintenanceId', displayName: 'Maintenance', type: 'string' },
  ];



  constructor(
    private _route: ActivatedRoute,
    private _layoutService: LayoutService,
    private _reportConfigService: ReportConfigService,
  ) { }

  ngOnInit() {
    var titles: ToolBar = { title: '', subTitle: "Device Events" };
    this._layoutService.setTitlesToolBar(titles);
    this.getDeviceEvents();
  }

  getDeviceEvents() {
    this.name = this._route.snapshot.paramMap.get('name')
    this.deviceConfig = {
      id: this._route.snapshot.paramMap.get('id'),
      from: this._route.snapshot.paramMap.get('from'),
      to: this._route.snapshot.paramMap.get('to')
    }

    this._reportConfigService.setReportConfig(this.deviceConfig)
    this._reportConfigService.getAllEvents().subscribe((response: any) => {
      this.deviceEventsDetail = response;
      // console.log(JSON.stringify(response));
    })
  }
}
