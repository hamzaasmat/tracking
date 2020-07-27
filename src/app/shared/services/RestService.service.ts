import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError, first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ServiceHeaderParams } from '../models/index';

@Injectable({
    providedIn: 'root'
})
export abstract class RestService {
    // protected endPoint = 'http://203.135.22.231:8082'
    // protected endPoint = 'http://fleet.punjabcollege.net:8082';
    protected endPoint = 'http://172.19.10.231:8082';
    private errorMessage = null

    constructor(
        protected http: HttpClient,
        protected _snackBar: MatSnackBar
    ) { }

    protected headers(serviceHeaderParams?: ServiceHeaderParams) {
        // const username: string = 'admin';
        // const password: string = 'admin';
        // let authorization: string = 'Basic ' + btoa(username + ':' + password);
        let params = new HttpParams();
        if (serviceHeaderParams) {
            if (serviceHeaderParams.id) {
                params = params.append('deviceId', serviceHeaderParams.id);
            }
            if (serviceHeaderParams.from) {
                params = params.append('from', serviceHeaderParams.from);
            }
            if (serviceHeaderParams.to) {
                params = params.append('to', serviceHeaderParams.to);
            }
        }
        let headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                // 'Authorization': authorization
            }),
            withCredentials: true,
            params: params
        }
        return headers
    }

    protected get(relativeUrl: string, headers?: any, isFullUrl?: boolean): Observable<any> {
        if (headers) {
            return this.http.get(isFullUrl ? relativeUrl : this.endPoint + relativeUrl, headers)
                .pipe(
                    first(),
                    retry(1),
                    catchError(this.handleError.bind(this))
                );
        }
        else {
            return this.http.get(isFullUrl ? relativeUrl : this.endPoint + relativeUrl)
                .pipe(
                    first(),
                    retry(1),
                    catchError(this.handleError.bind(this))
                );
        }
    }

    protected post(relativeUrl: string, body?: any, headers?: any): Observable<any> {
        return this.http.post(this.endPoint + relativeUrl, body, { headers: headers, withCredentials: true })
            .pipe(
                retry(1),
                catchError(this.handleError.bind(this))
            );
    }

    protected put(relativeUrl: string, body?: any, headers?: any): Observable<any> {
        return this.http.put(this.endPoint + relativeUrl, body, { headers: headers, withCredentials: true })
            .pipe(
                first(),
                retry(1),
                catchError(this.handleError.bind(this))
            );
    }

    protected delete(relativeUrl: string, headers?: any): Observable<any> {
        return this.http.delete(this.endPoint + relativeUrl, { headers: headers, withCredentials: true })
            .pipe(
                first(),
                retry(1),
                catchError(this.handleError.bind(this))
            );
    }

    private handleError(error: any) {
        this.errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            this.errorMessage = `Error: ${error.error.message}`;
        } else {
            this.errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this._snackBar.open(this.errorMessage, 'OK');
        return throwError(this.errorMessage);
    }
}