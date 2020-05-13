import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    private userID: string;

    constructor(private userService: UserService, private router: Router) {}

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
        // clear local storage
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}
