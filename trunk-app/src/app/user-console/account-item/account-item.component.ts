import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-item',
  templateUrl: './account-item.component.html',
  styleUrls: ['./account-item.component.scss']
})
export class AccountItemComponent implements OnInit {
  accounts = [
    {
      username: 'username@gmail.com',
      type: 'google.com',
      // tslint:disable-next-line: max-line-length
      image: 'https://static.wixstatic.com/media/b43006_1f20d3cc251b462bb13abbd1fb0ddef9.jpg/v1/fill/w_950,h_534,al_c,q_90/b43006_1f20d3cc251b462bb13abbd1fb0ddef9.webp'
    },
    {
      username: 'user001@email.com',
      type: 'paypal.com',
      // tslint:disable-next-line: max-line-length
      image: 'https://lh3.googleusercontent.com/proxy/fsTCEO9egeDGSPb2ejWGaipyAJKncKBGkmFKED6emy3O82QiVnDozC8WuIJVA-XWX40G9ITNcplobYmJ9fwzNI8HH67AS_aEwIqugZ470hsddtEjqjo4fxKtv0575eo'
    }

  ];

  constructor() { }

  ngOnInit(): void {
  }

}
