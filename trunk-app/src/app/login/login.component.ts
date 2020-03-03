import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required
    ]),
    password: new FormControl('', [
      Validators.required
    ])
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doLogin(value: any) {
    if (value.username === 'user' && value.password === 'pass') {
      this.router.navigate(['/user', '0001']);
    }
  }
}
