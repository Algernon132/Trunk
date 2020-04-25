import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsoleService } from './console.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { FilterPipe } from '../filter.pipe';

@Component({
  selector: 'app-user-console',
  templateUrl: './user-console.component.html',
  styleUrls: ['./user-console.component.scss'],
  providers: [ConsoleService, UserService]
})
export class UserConsoleComponent implements OnInit {
  accounts = [];
  searchInput;

  newAccountForm = new FormGroup({
    name: new FormControl(''),
    url: new FormControl(''),
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private consoleService: ConsoleService, private modalService: NgbModal) { }

  ngOnInit(): void {
    // add spinner on page while loading
    this.accounts = this.consoleService.getAccounts();
  }

  open(content) {
    this.modalService.open(content);
  }
  addAccountItem(newItem: {name: string, url: string, username: string, password: string}) {
    this.consoleService.addAccount(newItem);
    this.accounts = this.consoleService.getAccounts();
  }

}
