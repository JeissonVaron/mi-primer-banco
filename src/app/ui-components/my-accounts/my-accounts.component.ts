import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { account } from 'src/app/interfaces/Account';
import { AccountDetailComponent } from '../account-detail/account-detail.component';
import { NewAccountComponent } from '../new-account/new-account.component';

@Component({
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrls: ['./my-accounts.component.scss'],
})
export class MyAccountsComponent implements OnInit {

  accounts: Array<account> = undefined;
  
  constructor(private modalController: ModalController, private storage: Storage) { }

  async ngOnInit() {
    this.accounts = await this.storage.get('myAccounts');
  }

  async seeDetail(account: account) {
    const modal = await this.modalController.create({
      component: AccountDetailComponent,
      componentProps: {
        account
      },
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async newAccount() {
    const modal = await this.modalController.create({
      component: NewAccountComponent,
      cssClass: 'my-custom-class'
    });
    await modal.present();

    modal.onDidDismiss().then(async () => {
      this.accounts = await this.storage.get('myAccounts');
    });
  }

}
