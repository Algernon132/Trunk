// import { UserService } from 'src/app/user.service';
import { Account } from './account.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConsoleService {

    // private loadedAccounts: Account[];
    url = 'http://ec2-3-21-190-112.us-east-2.compute.amazonaws.com:8080/users';

    constructor(private http: HttpClient) {}

    // get all user accouts from server
    getAccounts(userId, userPass): Observable<Account[]> {
        // request from server
        return this.http.post<Account[]>(this.url + '/getAllAcc',
            {
             userID: userId,
             masterPassword: userPass
            })
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
    // add account to user list of accounts
    addAccount(userId, userPass, newItem) {
        this.http.post<{success: boolean}>(this.url + '/addAcc',
        {
            userID: userId,
            name: newItem.name,
            url: newItem.url,
            accUsername: newItem.username,
            accPassword: newItem.password,
            masterPassword: userPass
        })
         .toPromise().then(responseData => {
            if (responseData.success) {
                return;
            } else {
                console.log("error occured: "+responseData);
            }
         });
    }
    // delete account from user list of accounts
    deleteAccount(userId, accId) {
        this.http.post<{success: boolean}>(this.url + '/DeleteAcc',
        {
            userID: userId,
            accID: accId
        })
         .toPromise().then(responseData => {
            if (responseData.success) {
                return;
            } else {
                console.log("error occured: "+responseData);
            }
         });
    }
    // update account in user list of accounts
    updateAccount(userId, userPass, account, newItem) {
        this.http.post<{success: boolean}>(this.url + '/updateAcc',
        {
            userID: userId,
            accID: account.accID,
            name: newItem.name,
            url: newItem.url,
            accUsername: newItem.username,
            accPassword: newItem.password,
            masterPassword: userPass
        })
         .toPromise().then(responseData => {
            console.log (responseData);
            if (responseData.success) {
                return;
            } else {
                console.log("error occured: "+responseData);
            }
         });
    }
    // get one account from user list of accounts, not needed at the moment
    // getOneAccount() {}
}
