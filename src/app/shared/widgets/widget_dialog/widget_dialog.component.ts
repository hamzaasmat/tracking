import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCalendar } from '@angular/material';
import { Moment } from 'moment';
import { ModalDialog } from '../../models/modalDialog';



@Component({
    selector: 'widget-Cal',
    templateUrl: './widget_dialog.component.html',
    styleUrls: ['./widget_dialog.component.scss']
})
export class WidgetDialogComponent implements OnInit {
    @ViewChild('MatCalendar', { static: false }) _datePicker: MatCalendar<Moment>
    values: any[] = []
    constructor(
        public dialogRef: MatDialogRef<WidgetDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ModalDialog
    ) {
    }

    ngOnInit() {
        this.values = this.data.value
        // console.log(JSON.stringify(this.data))
    }

    onNoClick() {
        this.dialogRef.close();
    }
    submit() {
        this.dialogRef.close(true);
    }
}

