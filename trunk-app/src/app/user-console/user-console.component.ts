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
    console.log('id in user: ' + this.userID);
    // fetch user accounts
    this.getAccounts();
  }

  getAccounts() {
    this.isLoading = true;

    this.consoleService.getAccounts(this.userID).subscribe(data => {
      this.isLoading = false;
      this.accounts = data;
    });
  }

  open(content) {
    this.hide = true;
    this.modalService.open(content, {centered: true});
  }

  addAccountItem(newItem: {name: string, url: string, username: string, password: string}) {
    // add account item
    this.consoleService.addAccount(newItem, this.userID);
    // fetch updated account list
    this.getAccounts();
    // clear add acount form
    this.newAccountForm.reset();
  }

}
