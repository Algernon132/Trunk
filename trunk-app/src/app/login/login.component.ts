import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../user.service';
// import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  error = false;

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { } // , private userService: UserService

  ngOnInit(): void {
  }

   doLogin(loginData: {username: string; password: string}) {
    // send to backend for login validation
    if (this.userService.doLogin(loginData) === true) {
      this.error = true;
    } else {
      this.router.navigate(['/user']);
    }
  }
}
