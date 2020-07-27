import { Component, Inject, OnInit, Input, OnChanges } from '@angular/core';
import { TrackingDataService } from 'src/app/shared/services/trackingService/trackingData.service';
import { ReportConfigService } from 'src/app/shared/services/reportConfig.service';
import { CoordinatesService, TransformationType, Direction } from 'angular-coordinates';

@Component({
    selector: 'attributes',
    templateUrl: 'attributes.component.html',
    styleUrls: ['attributes.component.scss']
})
export class AttributesComponent implements OnInit, OnChanges {
    @Input() deviceAttributesId: number;
    deviceAttributes: any[] = [];
    data2: any;
    showPanel: boolean = true;
    constructor(
        private _trackingDataService: TrackingDataService,
        private _reportConfigService: ReportConfigService,
        public _coordinatesService: CoordinatesService,
    ) { }

    ngOnInit() {
        this.attr();
    }
    ngOnChanges() {
        this.attr();
    }
    hide() {
        this.showPanel = !this.showPanel
    }
    attr() {
        this._reportConfigService.getDeviceCoordinates().subscribe(res => {
            res.forEach(element => {
                // debugger
                // console.table(res.attributes)
                if (element.deviceId == this.deviceAttributesId) {
                    this.deviceAttributes = [
                        {
                            name: 'Priority',
                            value: element.attributes.priority ? element.attributes.priority : 'null',
                            icon: 'list'
                        },
                        {
                            name: 'Ignition',
                            value: (element.attributes.Ignition ? 'Yes' : 'No'),
                            icon: 'vpn_key'
                        },
                        {
                            name: 'Total Distance',
                            value: element.attributes.totalDistance ? (element.attributes.totalDistance / 100).toFixed(2) + ' km' : 'Null',
                            icon: 'show_chart'
                        },
                        {
                            name: 'Power',
                            value: element.attributes.power ? (element.attributes.power).toFixed(1) + ' V' : 'Null',
                            icon: 'power_setting_new'
                        },
                        {
                            name: 'Battery',
                            value: element.attributes.battery ? (element.attributes.battery).toFixed(2) + ' V' : 'Null',
                            icon: 'battery_std'
                        },
                        {
                            name: 'Position',
                            value: element.latitude ? (element.latitude) : 'Null',
                            icon: 'room'
                        },
                    ];
                    this._trackingDataService.positionsUpdated.subscribe(result => {
                        if (result) {
                            this.data2 = this._trackingDataService.getPositionById(element.deviceId);
                            if (this.data2) {
                                this.deviceAttributes = [
                                    {
                                        name: 'Priority',
                                        value: this.data2.attributes.priority ? this.data2.attributes.priority : 'not found',
                                        icon: 'list'
                                    },
                                    {
                                        name: 'Ignition',
                                        value: (this.data2.attributes.Ignition ? 'Yes' : 'No'),
                                        icon: 'vpn_key',
                                        color: this.data2.attributes.Ignition ? 'warn' : '',
                                    },
                                    {
                                        name: 'Total Distance',
                                        value: this.data2.attributes.totalDistance ? (this.data2.attributes.totalDistance / 100).toFixed(2) + ' km' : 'Null',
                                        icon: 'show_chart'
                                    },
                                    {
                                        name: 'Power',
                                        value: this.data2.attributes.power ? (this.data2.attributes.power).toFixed(1) + ' V' : 'Null',
                                        icon: 'power_setting_new'
                                    },
                                    {
                                        name: 'Battery',
                                        value: this.data2.attributes.battery ? (this.data2.attributes.battery).toFixed(2) + ' V' : 'Not found',
                                        icon: 'battery_std'
                                    },
                                    {
                                        name: 'Position',
                                        value: element.latitude && element.longitude ? this._coordinatesService.transform(element.latitude, TransformationType.ToDegrees, Direction.Latitude) + ' , ' + this._coordinatesService.transform(element.longitude, TransformationType.ToDegrees, Direction.Longitude) : 'Not found',
                                        icon: 'room'
                                    },
                                ];
                            }
                        }
                    })


                }
            });
        })
    }
}