import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserOrderRoutingModule} from "./user-order-routing.module";
import {UserOrderComponent} from "./user-order.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    UserOrderComponent
  ],
    imports: [
        CommonModule,
        UserOrderRoutingModule,
        MatTabsModule,
        MatFormFieldModule,
    ]
})
export class UserOrderModule { }
