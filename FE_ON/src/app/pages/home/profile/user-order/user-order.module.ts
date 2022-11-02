import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserOrderRoutingModule} from "./user-order-routing.module";
import {UserOrderComponent} from "./user-order.component";
import {MatTabsModule} from "@angular/material/tabs";
import {NgxStarsModule} from "ngx-stars";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

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
