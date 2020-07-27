import { Component, OnInit, Inject, Input, TemplateRef, Output, EventEmitter, OnChanges } from '@angular/core';
import { Column } from '../../models';



@Component({
    selector: 'widget-table',
    templateUrl: './widget_table.component.html',
    //   styleUrls: ['./widget_bottomSheet.component.scss']
})
export class WidgetTable implements OnInit, OnChanges {
    @Input() Columns: Column[];
    @Input() Rows: any = [];
    @Input() data: TemplateRef<any>;
    @Input() item: any;
    @Input() indexMatched: number;
    @Output() btnClicked: EventEmitter<any> = new EventEmitter();

    // @Output() fnCalling: EventEmitter<any> = new EventEmitter();
    recordsPerPage = [
        {
            num: 10
        },
        {
            num: 50
        },
        {
            num: 100
        }
    ];
    itemsPerPage = this.recordsPerPage[0].num;
    curPage = 0;
    totalPages = 0; //this.total.length / itemPerPage;
    newArr: any[] = [];

    constructor(

    ) {
    }

    ngOnInit() {

    }
    ngOnChanges() {
        this.createCurPage()
        if (this.Rows) {
            this.createCurPage();
        }
    }

    clickBtn(index, element){
        this.btnClicked.emit({index: index, element: element});
    }

    createCurPage() {
        if (this.Rows && this.Rows.length) {
            this.totalPages = Math.ceil(this.Rows.length / this.itemsPerPage);
            if (this.curPage >= this.totalPages) {
                this.curPage = 0;
            }
            this.newArr = this.Rows.filter((val, i) => i >= this.curPage * this.itemsPerPage && i < (this.curPage + 1) * this.itemsPerPage)
            console.table(this.newArr);
        }
    }

    incrementPage() {
        if (this.curPage + 1 < this.totalPages) {
            this.curPage++;
            this.createCurPage();
        }
        this.indexMatched = null
    }

    decrementPage() {
        if (this.curPage > 0) {
            this.curPage--;
            this.createCurPage();
        }
        this.indexMatched = null
    }

    gotoPage(pageNum: number) {
        if (pageNum > 0 && pageNum < this.totalPages) {
            this.curPage = pageNum - 1;
            this.createCurPage();
        }
    }
}

