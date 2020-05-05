import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsoleService } from './console.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { FilterPipe } from '../filter.pipe';
import { Account } from './account.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-console',
  templateUrl: './user-console.component.html',
  styleUrls: ['./user-console.component.scss']
})
export class UserConsoleComponent implements OnInit {
  hide = true;
  accounts: Account[] = [];
  searchInput;
  isLoading = false;
  userID: string;

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
    });
    }, 2000);
  }

  addAccountItem(newItem: {name: string, url: string, username: string, password: string}) {
    // add account item
    this.consoleService.addAccount(this.userID, newItem);
    // fetch updated account list
    this.getAccounts();
    // clear add acount form
    this.newAccountForm.reset();
  }
  deleteAccountItem(account) {
    // delete account item
    this.consoleService.deleteAccount(this.userID, account.accID);
    // fetch updated account list
    this.getAccounts();
  }
  updateAccountItem(account) {
    // update account item
    this.consoleService.updateAccount(this.userID, account);
    // fetch updated account list
    this.getAccounts();
  }

}
