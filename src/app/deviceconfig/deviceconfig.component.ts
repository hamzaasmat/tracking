import { Component, OnInit, Inject, Output } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { DeviceConfig, DeviceRouute } from '../shared/models/index';
import * as moment from 'moment'
import { ReportConfigService } from '../shared/services/reportConfig.service';
import { Router } from '@angular/router';

interface reportTypes {
    name: string;
    url: string;
}
interface reportTimePeriod {
    name: string;
    value: string;
    from?: any;
    to?: any;
}
@Component({
    selector: 'widget-config',
    templateUrl: './deviceconfig.component.html',
    //   styleUrls: ['./widget_bottomSheet.component.scss']
})
export class DeviceConfigComponent implements OnInit {

    deviceConfig: DeviceConfig = {
        id: this._reportConfigService.getData().id,
        name: this._reportConfigService.getData().name,
        from: '',
        to: ''
    }
    allRoutes: DeviceRouute;
    timeFrom: string;
    timeTo: string;
    isLoading: boolean = false;
    date = moment().format('YYYY-MM-DD');
    reportTypeVal: any;
    reportTimeVal: reportTimePeriod;
    crrDate = new Date();
    enableCustomForm: boolean;
    reportTypes: reportTypes[] = [
        {
            name: 'Route',
            url: 'deviceroute'
        },
        {
            name: 'Events',
            url: 'deviceevents'
        },
        {
            name: 'Trips',
            url: 'devicetrips'
        },
        {
            name: 'Stops',
            url: 'devicestops'
        },
        {
            name: 'Summary',
            url: 'devicesummary'
        }
    ]
    reportTimePeriod: reportTimePeriod[] = [
        {
            name: 'Custom',
            value: 'custom'
        },
        {
            name: 'Today',
            value: 'today',
            from: new Date(moment(this.crrDate).format('YYYY-MM-DD') + ' ' + '00:00').toISOString(),
            to: new Date(moment(this.crrDate).format('YYYY-MM-DD') + ' ' + moment(this.crrDate).format('HH:mm')).toISOString()
        },
        {
            name: 'Yesterday',
            value: 'yesterday',
            from: new Date(moment().subtract(1, 'day').format('YYYY-MM-DD') + ' ' + '00:00').toISOString(),
            to: new Date(moment().subtract(1, 'day').format('YYYY-MM-DD') + ' ' + '11:59').toISOString()
        },
        {
            name: 'This week',
            value: 'week',
            from: new Date(moment().subtract(7, 'day').format('YYYY-MM-DD') + ' ' + '00:00').toISOString(),
            to: new Date(moment(this.crrDate).format('YYYY-MM-DD') + ' ' + moment(this.crrDate).format('HH:mm')).toISOString()
        }
    ]
    constructor(
        private _router: Router,
        private _bottomSheetRef: MatBottomSheetRef<DeviceConfigComponent>,
        private _reportConfigService: ReportConfigService,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) {

    }

    ngOnInit() {
        // console.log("Data: " + JSON.stringify(this.getData))
        // console.log(date)
        this.myFn();
    }
    enableCustomFrm() {
        if (this.reportTimeVal.value == 'custom') {
            this.enableCustomForm = true;
        } else {
            this.enableCustomForm = false;
        }
    }
    getReportType() {
        alert(this.reportTypeVal);
    }
    getConfig() {

        if (this.reportTimeVal.value == 'custom') {
            let dateFrom = new Date(moment(this.deviceConfig.from).format('YYYY-MM-DD') + ' ' + this.timeFrom).toISOString()
            let dateTo = new Date(moment(this.deviceConfig.to).format('YYYY-MM-DD') + ' ' + this.timeTo).toISOString()
            // this.isLoading = true;
            this.deviceConfig = {
                id: this.deviceConfig.id,
                name: this.deviceConfig.name,
                from: dateFrom,
                to: dateTo
            }
            this._router.navigate(['/' + this.reportTypeVal + '', { id: this.deviceConfig.id, from: this.deviceConfig.from, to: this.deviceConfig.to, name: this.deviceConfig.name }])
            this._bottomSheetRef.dismiss(null);
        } else {
            this.deviceConfig = {
                id: this.deviceConfig.id,
                name: this.deviceConfig.name,
                from: this.reportTimeVal.from,
                to: this.reportTimeVal.to
            }
            // alert(JSON.stringify(this.deviceConfig) + ' : ' + this.reportTimeVal.name)
            this._router.navigate(['/' + this.reportTypeVal + '', { id: this.deviceConfig.id, from: this.deviceConfig.from, to: this.deviceConfig.to, name: this.deviceConfig.name }])
            this._bottomSheetRef.dismiss(null);
        }
    }
    close() {
        this._bottomSheetRef.dismiss(null);
    }


    myFn() {
        let x: number = 10;
        let print = ''
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < i; j++) {
                let s = 1;
                while (s <= i) {
                    print += ' '
                    s++
                }
                print += '*'
            }
            print += '\n'
        }

        // console.log(print);
    }
}

