import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  url = 'http://localhost:3000/';

  userData: any;
  constructor(private http: HttpClient) {}

  setSignupData(data: any) {
    return this.http.post(this.url + 'signupdata', data);
  }

  // setLoginData(data: any) {
  //   return this.http.post(this.url + 'logindata', data);
  // }

  getData(email: any, password: any) {
    return this.http.get(
      this.url + 'signupdata?email=' + email + '&password = ' + password
    );
  }

  setUser(user: any): void {
    localStorage.setItem('userDetails', JSON.stringify(user));
    this.userData = user;
  }

  getUser(): any {
    let user = localStorage.getItem('userDetails');
    return user;
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('isActive');
    return !!token;
  }
}
