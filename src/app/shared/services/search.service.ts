import { Injectable, EventEmitter } from '@angular/core';
import { SearchQuery } from '../models';


@Injectable({
    providedIn: 'root'
})
export class SearchService {

    setSearchData: EventEmitter<any> = new EventEmitter();
    search(query: SearchQuery) {
        if (query.data) {
            if (query.onlineOnly) {
                var filtered = Object.keys(query.data).reduce(function (filtered, key) {
                    if (query.data[key].status && query.data[key].status.toLowerCase() == 'online') {
                        filtered[key] = query.data[key];
                    }
                    return filtered;
                }, {});

                return filtered;

                // return query.data.filter(x => x.status && x.status.toLowerCase() == 'online');
            }

            if (query.name) {
                // var filtered = Object.keys(query.data).reduce(function (filtered, key) {
                //     if (query.data[key].name && query.data[key].name.toLowerCase().includes(query.name.toLowerCase())) {
                //         filtered[key] = query.data[key];
                //     }
                //     return filtered;
                // }, {});
                return query.data.filter(x => x.name && x.name.trim().toLowerCase().includes(query.name.trim().toLocaleLowerCase()));

                // return filtered;
            }
        }
    }

}

