import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderState } from '../models';
import { LoaderService } from '../services/loader.service';
@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    show = false;
    private subscription: Subscription;
    constructor(private _loaderService: LoaderService) { }
    ngOnInit() {
        this.subscription = this._loaderService.loaderState
            .subscribe((state: LoaderState) => {
                this.show = state.show;
            });
    }
    // ngOnDestroy() {
    //     this.subscription.unsubscribe();
    // }
}