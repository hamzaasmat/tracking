import { Injectable, EventEmitter } from '@angular/core';
import { ToolBar, LayoutModel } from '../models/index';

@Injectable({
    providedIn: 'root'
})
export class LayoutService {

    public titles: ToolBar = { title: "", subTitle: "" };
    public titlesChanged: EventEmitter<ToolBar> = new EventEmitter();
    public themeModeDetect: EventEmitter<LayoutModel> = new EventEmitter();
    public isRightNavEnabled: EventEmitter<boolean> = new EventEmitter();
    public isLeftNavEnabled: EventEmitter<boolean> = new EventEmitter();
    public isRefreshedData: EventEmitter<boolean> = new EventEmitter();
    refreshed: boolean;
    themeMode: LayoutModel = {
        mode: ''
    }
    public setTitles(title: string, subTitle?: string) {
        this.titles.title = title;
        if (subTitle) {
            this.titles.subTitle = subTitle;
        }
        else {
            this.titles.subTitle = "";
        }
        this.titlesChanged.emit(this.titles);
    }
    public isRefreshed(refresh) {
        this.refreshed = refresh;
        this.isRefreshedData.emit(this.refreshed)
    }
    public setThemeMode(mode) {
        this.themeMode = mode;
        this.themeModeDetect.emit(mode)
    }
    public getthemeMode() {
        return this.themeMode;
    }
    public setTitlesToolBar(titles: ToolBar) {
        this.titles.title = titles.title;
        if (titles.subTitle) {
            this.titles.subTitle = titles.subTitle;
        }
        else {
            this.titles.subTitle = "";
        }
        this.titlesChanged.emit(this.titles);
    }
    public getToolBarData() {
        return this.titles;
    }

    public isNavEnabled(value) {
        this.isRightNavEnabled.emit(value);
    }
    public isNavEnabledLeft(value) {
        this.isLeftNavEnabled.emit(value);
    }

}
