import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
// import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  error = false;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { } // , private userService: UserService

  ngOnInit(): void {
  }

   doLogin() {
    this.userService.doLogin(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }
}
