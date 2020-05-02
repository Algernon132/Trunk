import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  error = false;

  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required
    ]),
    name: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    verifyPassword: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  doSignup(loginData: {email: string, name: string; password: string; verifyPassword: string}) {
    const sendData = { email: loginData.email, name: loginData.name, password: loginData.password};
    this.error = false;
    if (loginData.password !== loginData.verifyPassword) {
      this.error = true;
    } else if (this.userService.doSignup(sendData) === true) {
      this.error = true;
    } else {
      // this.router.navigate(['/user']);
    }
  }
}
