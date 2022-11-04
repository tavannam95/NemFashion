import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserOrderRoutingModule} from "./user-order-routing.module";
import {UserOrderComponent} from "./user-order.component";
import {MatTabsModule} from "@angular/material/tabs";

@NgModule({
  declarations: [
    UserOrderComponent
  ],
    imports: [
        CommonModule,
        UserOrderRoutingModule,
        MatTabsModule,
    ]
})
export class UserOrderModule { }
