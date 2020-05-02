// import { UserService } from 'src/app/user.service';
import { Account } from './account.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ConsoleService {

    private loadedAccounts: Account[];

    constructor(private http: HttpClient) {}


    getAccounts(userID): Observable<Account[]> {
        // request from server
        return this.http.post<Account[]>('http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/getAllAcc',
         { 'userID': userID});
    }
    addAccount(newItem, userId) {
        this.http.post('http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/addAcc',
        {
            userID: userId,
            name: newItem.name,
            url: newItem.url,
            accUsername: newItem.username,
            accPassword: newItem.password
        })
         .subscribe(responseData => {
             console.log(responseData);
         });
    }

    // updateAccount() {}
    // deleteAccount() {}
    // getOneAccount() {}
}
