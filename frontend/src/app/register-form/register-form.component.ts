import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { LoginFormService } from '../login-form.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {

  @ViewChild('form')
  form: NgForm;
  login: string;
  password: string;
  password2: string;
  errorMsg: string;

  constructor(
    private formService: LoginFormService,
    public dialog: MatDialog,
    ) { }

  openDialog(error: string): void {
    console.log(`Error: ${error}`);
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: { message: 'This login already exists! Please pick up another one' }
    });

    dialogRef.afterClosed().subscribe( result => {
      console.log('The dialog was closed');
    });
  }

  onChange() {
    if (this.password !== this.password2) {
      this.errorMsg = 'Passwords are different!';
    } else {
      this.errorMsg = '';
    }
  }

  submitForm() {
    if (this.form.submitted && this.form.valid && !this.errorMsg) {
      this.formService.register(this.form.value).subscribe(
        data => console.log(data),
        error => this.openDialog(error)
      );
    } else {
      this.errorMsg = 'Please fill up missing data!';
    }
  }

  ngOnInit() {}


}
