import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { account } from 'src/app/interfaces/Account';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.scss'],
})
export class NewAccountComponent implements OnInit {

  type = 'personalAccount';
  formAccountPersonal: FormGroup;
  constructor(
    private modalController: ModalController,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formAccountPersonal = this.formBuilder.group({
      alias: new FormControl('', Validators.compose([Validators.required])),
      accountNumber: new FormControl('', Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(11)])),
      type: new FormControl('', Validators.compose([Validators.required])),
      balance: new FormControl('', Validators.compose([Validators.required])),
      typeCurrency: new FormControl('COP', Validators.compose([Validators.required])),
    });
  }

  get f() {
    return this.formAccountPersonal.controls;
  }

  dismissModal() {
    this.modalController.dismiss();
  }

  segmentChanged(event) {
    this.type = event.detail.value;
  }

  async registerAccount() {
    if (this.formAccountPersonal.invalid) {
      for (const prop in this.formAccountPersonal.controls) {
        this.formAccountPersonal.controls[prop].markAsTouched();
      }
    }

    let account: account = {
      alias: this.f.alias.value,
      accountNumber: Number(this.f.accountNumber.value),
      type: this.f.type.value,
      balance: Number(this.f.balance.value),
      typeCurrency: this.f.typeCurrency.value
    }
    let accounts = await this.storage.get('myAccounts');
    if (accounts && accounts.length) {
      accounts.push(account);
      this.storage.set('myAccounts', accounts);
      this.presentAlertConfirm();
    } else {
      this.storage.set('myAccounts', [account]);
    }
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: 'Cuenta creada exitodamente',
      buttons: ['OK']
    });

    await alert.present();
    alert.onDidDismiss().then(() => {
      this.dismissModal();
    });
  }
}
