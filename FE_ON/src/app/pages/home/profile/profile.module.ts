import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileRoutingModule} from "./profile-routing.module";
import {ProfileComponent} from "./profile.component";
import {AddressBookComponent} from "./address-book/address-book.component";
import {StrackOrderComponent} from "./strack-order/strack-order.component";
import {UserOrderComponent} from "./user-order/user-order.component";
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import { RatingComponent } from './rating/rating.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatRadioModule} from "@angular/material/radio";
import {NgxDropzoneModule} from "ngx-dropzone";
import {NgxStarsModule} from "ngx-stars";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ProfileComponent,
    StrackOrderComponent,
    SignupComponent,
    SigninComponent,
    RatingComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatDialogModule,
    MatRadioModule,
    NgxDropzoneModule,
    NgxStarsModule,
    FormsModule ,
    ReactiveFormsModule ,
  ]
})
export class ProfileModule {
}
