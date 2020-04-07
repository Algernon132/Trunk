import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsoleService } from './console.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-console',
  templateUrl: './user-console.component.html',
  styleUrls: ['./user-console.component.scss'],
  providers: [ConsoleService]
})
export class UserConsoleComponent implements OnInit {
  accounts = [];

  constructor(private router: Router, private consoleService: ConsoleService, private modalService: NgbModal) { }

  ngOnInit(): void {
    // spinner on page while loading
    this.accounts = this.consoleService.getAccounts();
  }

  open(content) {
    this.modalService.open(content);
  }

}
