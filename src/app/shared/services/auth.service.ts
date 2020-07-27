import { Injectable, EventEmitter } from '@angular/core';
import { RestService } from './RestService.service';
import { Observable } from 'rxjs';
import { IUsers, UserData } from '../models';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends RestService {

  private relativeUrl: string = '/api/users';

  public getAllUsers(): Observable<IUsers[]> {
    return this.get(this.relativeUrl, this.headers())
  }

  currentUser: UserData;
  currentUserChanged: EventEmitter<UserData> = new EventEmitter();

  setCurrentUser(response) {
    if (response && response.email) {
      this.currentUser = response;
      this.currentUserChanged.emit(this.currentUser);
      if (this.currentUser) {
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }
      // console.log('LOGIN' + JSON.stringify(response))
    }
    else {
      alert("Not Allowed");
    }
  }

  removeCurrentUser() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  getCurrentUser() {
    if (!this.currentUser) {
      var user: UserData = JSON.parse(localStorage.getItem('currentUser'));
      if (user && user.email) {
        this.currentUser = user;
      }
    }
    // console.table(this.currentUser);
    return this.currentUser;
  }

  userAuthLogin(user: UserData): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let body = `email=${user.email}&password=${user.password}`;
    return this.http.post(this.endPoint + '/api/session', body, { headers: headers, observe: 'response', withCredentials: true });
  }

  // getCookies() {
  //   var cookieStore: CookieStore = httpClient.getCookieStore();
  //   // get Cookies
  //   List <Cookie> cookies = cookieStore.getCookies();

  // }
  createToken(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.get('/api/session?token=user_token', { headers: headers, withCredentials: true });
  }

  deleteSession(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return this.http.delete(this.endPoint + '/api/session', { headers: headers, observe: 'response', withCredentials: true });
  }

  get getCrrUser() {
    return localStorage.getItem('currentUser');
  }
}
