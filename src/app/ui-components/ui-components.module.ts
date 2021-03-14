import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MyAccountsComponent } from './my-accounts/my-accounts.component';
import { RouterModule } from '@angular/router';
import { AccountDetailComponent } from './account-detail/account-detail.component';
import { NewAccountComponent } from './new-account/new-account.component';

@NgModule({
  declarations: [
    MyAccountsComponent,
    AccountDetailComponent,
    NewAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    MyAccountsComponent,
    FormsModule, ReactiveFormsModule
  ],
  entryComponents: [AccountDetailComponent, NewAccountComponent]
})
export class UiComponentsModule { }
