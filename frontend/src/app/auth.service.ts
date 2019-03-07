import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginUrl: string = '/api/users/login';
  logoutUrl: string = '/api/users/logout';
  registerUrl: string = '/api/users/register';

  private _isLoggedIn: boolean = true;

  constructor(private http: HttpClient) { }

  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }

  set isLoggedIn(state: boolean) {
    this._isLoggedIn = state;
  }

  logIn(user: object) {
    console.log(user);
    return this.http.post(this.loginUrl, user);
  }

  register(user: object) {
    console.log(user);
    return this.http.post(this.registerUrl, user);
  }

  logOut() {
    return this.http.get(this.logoutUrl);
  }

}
