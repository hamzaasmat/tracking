import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Inject } from '@angular/core';
import { UserData } from 'src/app/shared/models';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})


export class LoginComponent implements OnInit {
    isLoading: boolean = false
    userData: UserData = {
        email: '',
        password: ''
    }
    errorMessage: string;
    animationStyle: any
    show: boolean = false
    hideSection: boolean = false;
    constructor(
        private _authService: AuthService,
        private _router: Router,
        private _snackBar: MatSnackBar,
    ) {
    }

    ngOnInit() {
        if (this._authService.getCurrentUser()) {
            this.gotoHome();
        }
    }
    onChng() {
        this.animationStyle = {
            'left': this.userData.email.length + '2px',
            // 'transform': 'rotate(-' + (this.userData.email.length+2) + 'deg)',
        }
    }
    showPassword() {
        this.show = !this.show;
    }
    hideSectionInfo() {
        this.hideSection = !this.hideSection;
    }
    login() {
        this._authService.userAuthLogin(this.userData).subscribe(response => {
            if (response.status >= 200 && response.status <= 400 && response.body) {
                this._authService.setCurrentUser(response.body)
                this.gotoHome();
            }
            else {
                this.errorMessage = 'Invalid email or password'
                this._snackBar.open(this.errorMessage, 'OK');
            }

        }, err => {
            this.errorMessage = 'Invalid email or password'
            this._snackBar.open(this.errorMessage, 'OK');
        })
    }

    gotoHome() {
        this._router.navigate(['/home']);
    }
}