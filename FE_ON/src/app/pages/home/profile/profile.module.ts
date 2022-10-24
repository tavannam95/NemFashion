import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileComponent} from "./profile.component";
import {AddressBookComponent} from "./address-book/address-book.component";
import {StrackOrderComponent} from "./strack-order/strack-order.component";
import {UserOrderComponent} from "./user-order/user-order.component";
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';

@NgModule({
  declarations: [
    ProfileComponent,
    StrackOrderComponent,
    SignupComponent,
    SigninComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
  ]
})
export class ProfileModule {
}
