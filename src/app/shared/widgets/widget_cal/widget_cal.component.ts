import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCalendar } from '@angular/material';
import { Moment } from 'moment';



@Component({
    selector: 'widget-Cal',
    templateUrl: './widget_cal.component.html',
    //   styleUrls: ['./widget_bottomSheet.component.scss']
})
export class WidgetDialogCalComponent implements OnInit {
    @ViewChild('MatCalendar', { static: false }) _datePicker: MatCalendar<Moment>
    selectedDate: string
    constructor(
        public dialogRef: MatDialogRef<WidgetDialogCalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
    }

    ngOnInit() {


    }
    getChangedValue(e) {
        this.selectedDate = new Date(e).toISOString();
        this.dialogRef.close(this.selectedDate);
    }
    // onNoClick() {
    //     this.dialogRef.close(this.selectedDate);
    //     this.dialogRef.afterClosed().subscribe(res => {
    //         console.log('Date = ' + res)
    //     })
    // }
}

