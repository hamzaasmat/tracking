import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { BottomSheetData } from '../../models/bottomSheet';



@Component({
    selector: 'widget-list',
    templateUrl: './widget_bottomSheet.component.html',
    //   styleUrls: ['./widget_bottomSheet.component.scss']
})
export class WidgetBottomSheetComponent implements OnInit {
    getData: any[] = []
    constructor(
        private _bottomSheetRef: MatBottomSheetRef<WidgetBottomSheetComponent>,
        @Inject(MAT_BOTTOM_SHEET_DATA) public data: BottomSheetData
    ) {
    }

    ngOnInit() {
        this.getData = this.data.data
        // console.log("Data: " + JSON.stringify(this.getData))
    }
    onClose(data) {
        if(data){
            this._bottomSheetRef.dismiss(data);
        }else {
            this._bottomSheetRef.dismiss();
        }
        
    }
}

