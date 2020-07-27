import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../../services/search.service';


@Component({
    selector: 'widget-search',
    templateUrl: './widget_search.component.html',
    //   styleUrls: ['./widget_bottomSheet.component.scss']
})
export class WidgetSearchComponent implements OnInit {
    @Input() response: any[] = [];
    @Input() dataToBeSearch: any[] = [];
    constructor(
        private _searchService: SearchService
    ) {
    }

    ngOnInit() {
        // console.log(JSON.stringify('response Array = ' + this.response))
    }

    search(name: string) {
        if (!name) {
            this.response = this.dataToBeSearch;
        } else {
            this.response = this._searchService.search({ data: this.dataToBeSearch, onlineOnly: false, name: name });
        }
    }

}

