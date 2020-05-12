import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsoleService } from './console.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Account } from './account.model';
import { map } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-console',
  templateUrl: './user-console.component.html',
  styleUrls: ['./user-console.component.scss'],
  // animation for alert messages to fade in and out
  animations: [
    trigger(
      'fadeInAnimation',
      [
        transition(
          ':enter',
          [
            style({opacity: 0}),
            animate('1.5s ease-out', style({opacity: 1}))
          ]
        ),
        transition(
          ':leave',
          [
            style({opacity: 1}),
            animate('0.5s ease-in', style({opacity: 0}))
          ]
        )
      ]
    )
  ]
})
export class UserConsoleComponent implements OnInit {
  hide = true;  // for toggling password visibility in input field
  accounts: Account[] = []; // accounts array for cards
  searchInput;  // for search bar input
  isLoading = false;  // for showing loading spinner
  userID: string;
  alertShow = false;          // for showing alerts
  alertMsg = 'Welcome Back!';   // default alert message

  newAccountForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });
  accountForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private consoleService: ConsoleService,
              private modalService: NgbModal, private userService: UserService) { }

  ngOnInit(): void {
    // get userId on init
    this.userID = this.userService.getUserId();
    // fetch user accounts on init to load cards
    this.getAccounts();
  }
  // modal open functionality
  open(content) {
    this.hide = true;
    this.modalService.open(content, {centered: true});
  }
  // get all user accounts
  getAccounts() {
    // show spinner while loading
    this.isLoading = true;
    // 1 sec timeout to allow server to run multiple requests
    setTimeout(() => {
      // get accounts list
      this.consoleService.getAccounts(this.userID).subscribe(data => {
      // hide loading spinner
      this.isLoading = false;
      // set accounts to new accounts array
      this.accounts = data;
      // show alert of result
      this.alertShow = true;
    });
    }, 1000);
  }
  // add new account to list
  addAccountItem(newItem: {name: string, url: string, username: string, password: string}) {
    // add account item
    this.consoleService.addAccount(this.userID, newItem);
    // fetch updated account list
    this.getAccounts();
    // clear add acount form
    this.newAccountForm.reset();
    // set message alert text
    this.alertMsg = 'New Trunk Added!';
  }
  deleteAccountItem(account) {
    // delete account item
    this.consoleService.deleteAccount(this.userID, account.accID);
    // fetch updated account list
    this.getAccounts();
    // set message alert text
    this.alertMsg = 'Trunk Deleted!';
  }
  updateAccountItem(account) {
    // update account item
    this.consoleService.updateAccount(this.userID, account);
    // fetch updated account list
    this.getAccounts();
    // set message alert text
    this.alertMsg = 'Trunk Updated!';
  }

}
