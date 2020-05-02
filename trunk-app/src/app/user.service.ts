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

    doLogin(username: string, password: string) {

        return this.http.post('http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/login',
         {
            email: username,
            password
        }).subscribe((responseData: any) => {
            this.userId = responseData.id;
            console.log('id: ' + this.userId);
            this.router.navigate(['/user']);
        });
    }

     doSignup(loginData) {
        // console.log('sending: ' + JSON.stringify(loginData));

        // this.http.post('http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/signup', loginData)
        // .toPromise().then((responseData) => {
        //     console.log('Server response:' + responseData.id);
        //     if (responseData.hasOwnProperty('error')) {
        //         this.err = true;
        //     } else {
        //         this.userId = (responseData);
        //         this.router.navigate(['/user']);
        //     }
        // });

        return this.err;
     }
}
