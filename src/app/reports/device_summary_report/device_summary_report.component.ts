import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, Input, Pipe } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { DeviceRoute, ToolBar, DeviceConfig, Column, getShortDatePipe, getSpeedPipe, DeviceEvents, getDurationPipe, getDistancePipe } from 'src/app/shared/models';
import { ReportConfigService } from 'src/app/shared/services/reportConfig.service';

import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-device-route-report',
  templateUrl: './device_summary_report.component.html',
  styleUrls: ['./device_summary_report.component.scss'],
})
export class DeviceSummaryReportComponent implements OnInit {
  deviceSummaryDetail: DeviceEvents[];
  deviceConfig: DeviceConfig;
  name: string;
  indexMatched: number;

  column: Column[] = [
    { value: 'distance', displayName: 'Distance', type: 'string', pipe: getDistancePipe() },
    { value: 'startOdometer', displayName: 'Start Odometer', type: 'string', pipe: getDistancePipe() },
    { value: 'endOdometer', displayName: 'End Odometer', type: 'string', pipe: getDistancePipe() },
    { value: 'averageSpeed', displayName: 'Average Speed', type: 'string', pipe: getSpeedPipe() },
    { value: 'maxSpeed', displayName: 'Max. Speed', type: 'string', pipe: getSpeedPipe() },
    { value: 'engineHours', displayName: 'Engine Hours', type: 'string', pipe: getSpeedPipe() },
    { value: 'spentFuel', displayName: 'Spent Fuel', type: 'string' },
  ];



  constructor(
    private _route: ActivatedRoute,
    private _layoutService: LayoutService,
    private _reportConfigService: ReportConfigService,
  ) { }

  ngOnInit() {
    var titles: ToolBar = { title: '', subTitle: "Device Summary" };
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
    this._reportConfigService.getAllSummary().subscribe((response: any) => {
      this.deviceSummaryDetail = response;
      // console.log(JSON.stringify(response));
    })
  }
}
