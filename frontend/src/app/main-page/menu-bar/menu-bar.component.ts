import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent implements OnInit {

  options: FormGroup;

  constructor(public router: Router, fb: FormBuilder, private formService: AuthService) {
    this.options = fb.group({
      bottom: 0,
      fixed: true,
      top: 0
    });
  }

  ngOnInit() {
  }

  logout() {
    this.formService.logOut().subscribe(
      data => {
        this.router.navigate(['/login']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
