import { Component, OnInit, Inject, Input, ViewChild, Output, EventEmitter } from '@angular/core';
// import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
// import { BottomSheetData } from '../../models/bottomSheet';
import { LayoutService } from '../../services/layout.service';
import { ToolBar } from '../../models/toolBar';
import { MatMenuTrigger } from '@angular/material/menu';
import { LayoutModel } from '../../models/layout';
import { WeatherService } from '../../services';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserData } from '../../models';


@Component({
    selector: 'widget-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolBarComponent implements OnInit {
    @ViewChild(MatMenuTrigger, { static: false }) trigger: MatMenuTrigger;
    @Output() clicked: EventEmitter<any> = new EventEmitter();
    @Input() toolbarColor: any;
    @Input() toolbarClass: any;
    value: boolean = localStorage.getItem('mode') ? true : false;
    title: string = ''
    subTitle: string = ''
    localStrg: any
    isChecked = localStorage.getItem('mode');

    currentUser: UserData = { email: '', name: '' };

    enabled: boolean;
    enabledLeftBar: boolean;

    constructor(
        private _layoutService: LayoutService,
        private _weatherService: WeatherService,
        private _authService: AuthService,
        private router: Router
    ) {
        this._authService.currentUserChanged.subscribe(user => {
            this.currentUser = user;
        })
        this.currentUser = this._authService.getCurrentUser();


    }

    ngOnInit() {

        this.localStrg = localStorage.getItem('mode')
        this._layoutService.titlesChanged.subscribe((titles: ToolBar) => {
            this.title = titles.title;
            this.subTitle = titles.subTitle;
            // console.log('titles = ' + JSON.stringify(titles))
        });

    }
    onSubmit() {
        this.value = !this.value
        if (this.value == true) {
            localStorage.setItem('mode', 'true');
            this.localStrg = localStorage.getItem('mode')
            this._layoutService.setThemeMode(this.localStrg)
        } else {
            localStorage.removeItem('mode');
            this._layoutService.setThemeMode('false')
        }
        let mode: LayoutModel = {
            mode: this.localStrg
        }

        this.clicked.emit(this.localStrg)



    }
    someMethod() {
        this.trigger.openMenu();
    }

    isRightNavEnabled() {
        this.enabled = !this.enabled;
        this._layoutService.isNavEnabled(this.enabled);
    }
    isLeftNavEnabled() {
        this.enabledLeftBar = !this.enabledLeftBar;
        this._layoutService.isNavEnabledLeft(this.enabledLeftBar);
    }

    logout() {
        if (this._authService.getCurrentUser()) {
            this._authService.deleteSession().subscribe(response => {
                console.table(response);
                if (response.status >= 200 && response.status < 300) {
                    this.currentUser = null;
                    this._authService.removeCurrentUser();
                    this.gotoLoginPage();
                }
            }, err => {
                alert("Logout unsuccessful!");
            });
        }
        else {
            alert("Already logged out!");
        }
    }

    gotoLoginPage() {
        this.router.navigate(['/login']);
    }
    redirectToHome() {
        this.router.navigate(['/home']);
    }
}

