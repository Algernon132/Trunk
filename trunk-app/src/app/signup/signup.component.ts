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

  doSignup() {
    if (this.signupForm.valid) {
      this.userService.doSignup(
        this.signupForm.get('email').value, this.signupForm.get('name').value, this.signupForm.get('password').value);
    } else {
      this.error = true;
    }
  }
}
