import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginFormService {
  loginUrl: string = '/api/users/login';
  registerUrl: string = '/api/users/register';

  constructor(private http: HttpClient) { }

  logIn(user: object) {
    console.log(user);
    return this.http.post(this.loginUrl, user);
  }

  register(user: object) {
    console.log(user);
    return this.http.post(this.registerUrl, user);
  }

}
