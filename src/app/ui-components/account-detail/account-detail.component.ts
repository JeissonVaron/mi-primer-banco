import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { account } from 'src/app/interfaces/Account';
import { AccountDetail } from 'src/app/interfaces/AccountDetail';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss'],
})
export class AccountDetailComponent implements OnInit {

  @Input() account: account = undefined;
  transactions: Array<AccountDetail> = [
    {
      name: 'Retiro por cajero',
      description: 'Retiro por cajero',
      value: 650000,
      type: '+',
      typeCurrency: 'COP',
      date: '05/03/2021 01:30:00 pm'
    },
    {
      name: 'Retiro por cajero',
      description: 'Retiro por cajero',
      value: 650000,
      type: '-',
      typeCurrency: 'COP',
      date: '05/03/2021 01:30:00 pm'
    }
  ]
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log('this.account :>> ', this.account);
  }

  dismissModal() {
    this.modalController.dismiss();
  }

}
