import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditModel } from 'src/app/shared/models';
import { DeviceService } from 'src/app/shared/services/devices.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { MatSnackBar } from '@angular/material';
export interface DialogData {
    animal: string;
    name: string;
}
@Component({
    selector: 'add-edit-modal',
    templateUrl: 'add_editModal.component.html',
    styleUrls: ['add_editModal.component.scss']
})
export class AddEditModalComponent implements OnInit {
    AddEditModelData: AddEditModel = {
        category: '',
        contact: '',
        model: '',
        name: '',
        uniqueId: null,
        id: 0
    };
    categories = [
        "motorcycle",
        "car",
    ]
    mode = 'add';
    disabled;

    constructor(
        private _deviceService: DeviceService,
        private _layoutService: LayoutService,
        private _snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<AddEditModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: AddEditModel) { }

    ngOnInit() {
        if (this.data) {
            this.AddEditModelData = {
                id: this.data.id,
                name: this.data.name,
                uniqueId: this.data.uniqueId,
                model: this.data.model,
                contact: this.data.contact,
                category: this.data.category
            }
            this.mode = 'edit';
        }
        else {
            this.AddEditModelData = {
                category: '',
                contact: '',
                model: '',
                name: '',
                uniqueId: 0,
                id: 0
            };
            this.mode = 'add';
        }

    }
    isDisabledDevice(){
        this.disabled = !this.disabled;
        // alert(this.disabled);
    }
    editDevice(): void {
        this._deviceService.updateDevice(this.AddEditModelData.id, this.AddEditModelData).subscribe(res => {
            if (res) {
                this._layoutService.isRefreshed(true);
                let snackBarRef = this._snackBar.open(res.name + ' Device updated successfuly!');
            }
        });
        this.dialogRef.close();
    }
    addDevice(): void {
        // this.AddEditModelData = {
        //     id: 0,
        //     name: this.AddEditModelData.name,
        //     uniqueId: this.AddEditModelData.uniqueId,
        //     model: this.AddEditModelData.model,
        //     contact: this.AddEditModelData.contact,
        //     category: 'test',
        // }
        this._deviceService.addDevice(this.AddEditModelData).subscribe(res => {
            if (res) {
                this._layoutService.isRefreshed(true);
                let snackBarRef = this._snackBar.open(res.name + ' Device added successfuly!');
            }
        });
        // alert(JSON.stringify(this.AddEditModelData));
        this.dialogRef.close();
    }
    cancel(): void {
        this.dialogRef.close();
    }

}