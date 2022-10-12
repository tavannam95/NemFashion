import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserProflleComponent} from "./user-proflle.component";
import {UserProfileRoutingModule} from "./user-profile-routing.module";



@NgModule({
  declarations: [
     UserProflleComponent
  ],
  imports: [
    CommonModule ,
    UserProfileRoutingModule
  ]
})
export class UserProfileModule { }
