import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, Input, Pipe } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { DeviceRoute, ToolBar, DeviceConfig, Column, getShortDatePipe, getSpeedPipe, DeviceEvents, getDurationPipe, getDistancePipe } from 'src/app/shared/models';
import { ReportConfigService } from 'src/app/shared/services/reportConfig.service';

import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-device-route-report',
  templateUrl: './device_stops_report.component.html',
  styleUrls: ['./device_stops_report.component.scss'],
})
export class DeviceStopsReportComponent implements OnInit {
  deviceStopsDetail: DeviceEvents[];
  deviceConfig: DeviceConfig;
  name: string;
  indexMatched: number;

  column: Column[] = [
    { value: 'startTime', displayName: 'Start Time', type: 'string', pipe: DatePipe, pipeArgs: ['medium'] },
    { value: 'startOdometer', displayName: 'Odometer', type: 'string', pipe: getDistancePipe() },
    { value: 'address', displayName: 'Address', type: 'string' },
    { value: 'endTime', displayName: 'End Time', type: 'string', pipe: DatePipe, pipeArgs: ['medium'] },
    { value: 'duration', displayName: 'Duration', type: 'string', pipe: getDurationPipe() },
    { value: 'engineHours', displayName: 'Engine Hours', type: 'string', pipe: getDurationPipe() },
    { value: 'spentFuel', displayName: 'Spent Fuel', type: 'string' },
  ];



  constructor(
    private _route: ActivatedRoute,
    private _layoutService: LayoutService,
    private _reportConfigService: ReportConfigService,
  ) { }

  ngOnInit() {
    var titles: ToolBar = { title: '', subTitle: "Device Stops" };
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
    this._reportConfigService.getAllStops().subscribe((response: any) => {
      this.deviceStopsDetail = response;
      // console.log(JSON.stringify(response));
    })
  }
}
