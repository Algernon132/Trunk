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
  errorMsg = '';

  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
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
    // if (this.signupForm.get('password') !== this.signupForm.get('verifyPassword')) {
    //   this.errorMsg = 'Passwords do not match!';
    //   this.error = true;
    // } else {
      this.userService.doSignup(
        this.signupForm.get('email').value, this.signupForm.get('name').value, this.signupForm.get('password').value)
        .subscribe((responseData: any) => {
          // check for invalid input
          if (responseData.error) {
            this.error = true;
            this.errorMsg = responseData.error;
          // if valid: set userId and route to management console
          } else {
              this.error = false;
              this.userService.setUserId(responseData.id);
              this.router.navigate(['/user']);
          }
        });
    // }
  }
}
