import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class UserService {

    private err = false;
    private userId: string;
    private username: string;

    constructor(private http: HttpClient, private router: Router) {}

    getUserId() {
        return this.userId;
    }

    getUsername() {
        return this.username;
    }
    setUsername(user: string) {
        this.username = user;
    }

    doLogin(email: string, password: string) {

        return this.http.post('http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/login',
         {
            email,
            password
        }).subscribe((responseData: any) => {
            this.userId = responseData.id;
            console.log('id: ' + this.userId);
            this.router.navigate(['/user']);
        });
    }

     doSignup(email: string, name: string, password: string) {

        return this.http.post('http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/signup',
         {
            email,
            name,
            password
        }).subscribe((responseData: any) => {
            this.userId = responseData.id;
            console.log('id: ' + this.userId);
            this.router.navigate(['/user']);
        });

     }
}
