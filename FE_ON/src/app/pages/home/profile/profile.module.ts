import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileComponent} from "./profile.component";
import {StrackOrderComponent} from "./strack-order/strack-order.component";
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  declarations: [
    ProfileComponent,
    StrackOrderComponent,
    SignupComponent,
    SigninComponent,
    ForgotPasswordComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ProfileModule {
}
