// import { UserService } from 'src/app/user.service';
import { Account } from './account.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConsoleService {

    private loadedAccounts: Account[];

    constructor(private http: HttpClient) {}


    getAccounts(userId): Observable<Account[]> {
        // request from server
        return this.http.post<Account[]>('http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/getAllAcc',
         { userID: userId})
         .pipe(map(responseData => {
            const accountsArray: Account[] = [];
            for (const k in responseData) {
                if (responseData.hasOwnProperty(k)) {
                    accountsArray.push({ ...responseData[k]});
                }
            }
            return accountsArray;
          }));
    }
    addAccount(userId, newItem) {
        this.http.post<{success: string}>('http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/addAcc',
        {
            userID: userId,
            name: newItem.name,
            url: newItem.url,
            accUsername: newItem.username,
            accPassword: newItem.password
        })
         .toPromise().then(responseData => {
            if (responseData.success === 'true') {
                return;
            }
         });
    }

    deleteAccount(userId, accId) {
        this.http.post<{success: string}>('http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/DeleteAcc',
        {
            userID: userId,
            accID: accId
        })
         .toPromise().then(responseData => {
            if (responseData.success === 'true') {
                return;
            }
         });
    }

    updateAccount(userId, account) {
        this.http.post<{success: string}>('http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users/UpdateAcc',
        {
            userID: userId,
            accID: account.accID,
            name: account.name,
            url: account.url,
            accUsername: account.accUsername,
            accPassword: account.accPassword
        })
         .toPromise().then(responseData => {
            if (responseData.success === 'true') {
                return;
            }
         });
    }

    // getOneAccount() {}
}
