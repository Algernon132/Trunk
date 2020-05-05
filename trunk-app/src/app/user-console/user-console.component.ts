import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsoleService } from './console.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { FilterPipe } from '../filter.pipe';
import { Account } from './account.model';
import { map } from 'rxjs/operators';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-console',
  templateUrl: './user-console.component.html',
  styleUrls: ['./user-console.component.scss'],
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
  hide = true;
  accounts: Account[] = [];
  searchInput;
  isLoading = false;
  userID: string;
  alertShow = false;
  alertMsg = 'Welcome Back!';

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
    // get userId
    this.userID = this.userService.getUserId();
    // fetch user accounts
    this.getAccounts();
  }

  open(content) {
    this.hide = true;
    this.modalService.open(content, {centered: true});
  }
  getAccounts() {
    this.isLoading = true;

    setTimeout(() => {
      this.consoleService.getAccounts(this.userID).subscribe(data => {
      this.isLoading = false;
      this.accounts = data;
      this.alertShow = true;
    });
    }, 1000);
  }

  addAccountItem(newItem: {name: string, url: string, username: string, password: string}) {
    // add account item
    this.consoleService.addAccount(this.userID, newItem);
    // fetch updated account list
    this.getAccounts();
    // clear add acount form
    this.newAccountForm.reset();
    // message alert
    this.alertMsg = 'New Trunk Added!';
  }
  deleteAccountItem(account) {
    // delete account item
    this.consoleService.deleteAccount(this.userID, account.accID);
    // fetch updated account list
    this.getAccounts();
    // message alert
    this.alertMsg = 'Trunk Deleted!';
  }
  updateAccountItem(account) {
    // update account item
    this.consoleService.updateAccount(this.userID, account);
    // fetch updated account list
    this.getAccounts();
    // message alert
    this.alertMsg = 'Trunk Updated!';
  }

}
