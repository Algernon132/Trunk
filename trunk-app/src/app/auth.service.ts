import { Injectable } from '@angular/core';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    private userID: string;

    constructor(private userService: UserService) {}

    // check if user is logged in
    isLoggedIn() {
        // check if userID is set
        if (!this.userService.getUserId()) {
            return false;
        } else {
            return true;
        }
    }
    // lof out user
    logout() {
        // clear userID to log out user
        this.userService.setUserId('');
    }
}
