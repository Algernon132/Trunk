import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {

    url = 'http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users';

    // private userId: string;
    private username: string;
    // private password: string;

    constructor(private http: HttpClient, private router: Router) {}
    // get and set for user variables
    getUserId() {
        return localStorage.getItem('userID');
    }
    setUserId(userId: string) {
        // this.userId = userId;
        localStorage.setItem('userID', userId);
    }
    getUsername() {
        return this.username;
    }
    setUsername(user: string) {
        this.username = user;
    }
    getPassword() {
        return localStorage.getItem('mastPass');
    }
    setPassword(pass: string) {
        // this.password = pass;
        localStorage.setItem('mastPass', pass);
    }
    // user login
    doLogin(email: string, password: string) {

        return this.http.post(this.url + '/login',
         {
            email,
            password
        });
    }
    // user signup
     doSignup(email: string, name: string, password: string) {
        this.setPassword(password);

        return this.http.post(this.url + '/signup',
         {
            email,
            name,
            password
        });

     }
}
