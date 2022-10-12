import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserOrderRoutingModule} from "./user-order-routing.module";
import {UserOrderComponent} from "./user-order.component";

@NgModule({
  declarations: [
    UserOrderComponent
  ],
  imports: [
    CommonModule ,
    UserOrderRoutingModule
  ]
})
export class UserOrderModule { }
