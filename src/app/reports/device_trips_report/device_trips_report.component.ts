import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject, Input, Pipe } from '@angular/core';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { DeviceRoute, ToolBar, DeviceConfig, Column, getShortDatePipe, getSpeedPipe, DeviceEvents, DeviceTrips, getDistancePipe, getDurationPipe } from 'src/app/shared/models';
import { ReportConfigService } from 'src/app/shared/services/reportConfig.service';

import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-device-route-report',
  templateUrl: './device_trips_report.component.html',
  styleUrls: ['./device_trips_report.component.scss'],
})
export class DeviceTripsReportComponent implements OnInit {
  deviceTripsDetail: DeviceTrips[];
  deviceConfig: DeviceConfig;
  name: string;
  indexMatched: number;
  addressArr: any[] = [];




  constructor(
    private _route: ActivatedRoute,
    private _layoutService: LayoutService,
    private _reportConfigService: ReportConfigService,
  ) { }

  ngOnInit() {
    var titles: ToolBar = { title: '', subTitle: "Device Trips" };
    this._layoutService.setTitlesToolBar(titles);
    this.getDeviceTrips();
  }

  getDeviceTrips() {
    this.name = this._route.snapshot.paramMap.get('name')
    this.deviceConfig = {
      id: this._route.snapshot.paramMap.get('id'),
      from: this._route.snapshot.paramMap.get('from'),
      to: this._route.snapshot.paramMap.get('to')
    }

    this._reportConfigService.setReportConfig(this.deviceConfig)
    this._reportConfigService.getAllTrips().subscribe((response: any) => {
      this.deviceTripsDetail = response;
      // response.forEach(element => {
      //   this._reportConfigService.getAddress(element.startLat, element.startLon).subscribe(res => {
          
      //     this.addressArr = res.results[0].formatted_address;

      //     console.table(JSON.stringify(this.addressArr))
      //   })
      // });

      // console.log(JSON.stringify(response));
    })
  }


  column: Column[] = [
    { value: 'startTime', displayName: 'Time', type: 'string', pipe: DatePipe, pipeArgs: ['medium'] },
    { value: 'startOdometer', displayName: 'Odometer Start', type: 'string', pipe: getDistancePipe() },
    { value: 'endTime', displayName: 'Ent Time', type: 'string', pipe: DatePipe, pipeArgs: ['medium'] },
    { value: 'endOdometer', displayName: 'Odometer End', type: 'string', pipe: getDistancePipe() },
    { value: 'distance', displayName: 'Distance', type: 'string', pipe: getDistancePipe() },
    { value: 'averageSpeed', displayName: 'Average Speed', type: 'string', pipe: getSpeedPipe() },
    { value: 'maxSpeed', displayName: 'Max. Speed', type: 'string', pipe: getSpeedPipe() },
    { value: 'duration', displayName: 'Duration', type: 'string', pipe: getDurationPipe()  },
    { value: 'spentFuel', displayName: 'Spent Fuel', type: 'string' },
    { value: 'driverName', displayName: 'Driver', type: 'string' }
  ];
}
