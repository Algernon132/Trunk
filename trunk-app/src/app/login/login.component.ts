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
  errorMsg = '';

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { } // , private userService: UserService

  ngOnInit(): void {
  }

   doLogin() {
    this.userService.doLogin(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe((responseData: any) => {
      // check if username and password is valid, return error message
      if (responseData.error) {
        this.errorMsg = responseData.error;
        this.error = true;
      // if valid: set userId and route to management console
      } else {
          this.error = false;
          this.userService.setUserId(responseData.id);
          this.router.navigate(['/user']);
      }
    });
  }

}
