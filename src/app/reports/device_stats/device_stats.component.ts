import { Component, OnInit } from '@angular/core';
import { DeviceConfig, ModalDialog } from 'src/app/shared/models';
import { ReportConfigService } from 'src/app/shared/services/reportConfig.service';
import { WidgetDialogComponent } from 'src/app/shared/widgets/widget_dialog/widget_dialog.component';
import { MatDialog } from '@angular/material';
import { WidgetDialogCalComponent } from 'src/app/shared/widgets/widget_cal/widget_cal.component';

@Component({
    selector: 'device-stats',
    templateUrl: './device_stats.component.html',
})

export class ReportDeviceStats implements OnInit {
    isLoadingModal: boolean = false;
    deviceStats: DeviceConfig
    valueSelectedFromDate: string
    valueSelectedToDate: string
    constructor(
        private _reportConfigService: ReportConfigService,
        private _dialog: MatDialog
    ) {
    }
    ngOnInit() {

    }
    getFromDate(): void {
        const dialogRef = this._dialog.open(WidgetDialogCalComponent);
        dialogRef.afterClosed().subscribe(res => {
            this.valueSelectedFromDate = res;
        })
    }
    getToDate(): void {
        const dialogRef = this._dialog.open(WidgetDialogCalComponent);
        dialogRef.afterClosed().subscribe(res => {
            this.valueSelectedToDate = res;
        })
    }
    getStats() {
        this.isLoadingModal = true
        this.deviceStats = {
            from: this.valueSelectedFromDate,
            to: this.valueSelectedToDate
        }
        this._reportConfigService.setReportConfig(this.deviceStats);
        this._reportConfigService.getAllStats().subscribe(res => {
            this.isLoadingModal = false;
            let modalDialog: ModalDialog = {
                title: 'Device Stats',
                key: [
                    { key: 'captureTime', caption: 'Time' },
                    { key: 'activeUsers', caption: 'Active Users' },
                    { key: 'activeDevices', caption: 'Active Devices' },
                    { key: 'requests', caption: 'Requests' },
                    { key: 'messagesReceived', caption: 'Messages Received' },
                    { key: 'messagesStored', caption: 'Messages Stored' }

                ],
                value: res
            }

            const dialogRef = this._dialog.open(WidgetDialogComponent, { data: modalDialog });
            this.valueSelectedToDate = ''
            this.valueSelectedFromDate = ''
            // console.log(JSON.stringify(res))
        })

    }
}