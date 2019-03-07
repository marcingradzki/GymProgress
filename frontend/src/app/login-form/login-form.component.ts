import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;
  login: string;
  password: string;
  errorMsg: string;

  constructor(
    private authService: AuthService,
    private router: Router
    ) { }

  onChange(model) {
    console.log(model);
    console.log(this.login);
  }

  submitForm() {
    if (this.form.submitted && this.form.valid) {
      this.authService.logIn(this.form.value).subscribe(
        data => {
          this.authService.isLoggedIn = true;
          this.router.navigate(['/main']);
        },
        error => {
          this.errorMsg = "Invalid credentials";
        }
      );
    }
  }

  ngOnInit() {}
}
