import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderManagerComponent } from './order-manager/order-manager.component';
import {OrderRoutingModule} from "./order-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    OrderManagerComponent
  ],
  imports: [
    CommonModule,
      OrderRoutingModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule
  ]
})
export class OrderModule { }
