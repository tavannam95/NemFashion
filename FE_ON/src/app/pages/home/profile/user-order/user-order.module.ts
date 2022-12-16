import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserOrderRoutingModule} from "./user-order-routing.module";
import {UserOrderComponent} from "./user-order.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatFormFieldModule} from "@angular/material/form-field";
import { ExchangeOrderDialogComponent } from './exchange-order-dialog/exchange-order-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    UserOrderComponent,
    ExchangeOrderDialogComponent
  ],
    imports: [
        CommonModule,
        UserOrderRoutingModule,
        MatTabsModule,
        MatFormFieldModule,
        MatDialogModule
    ]
})
export class UserOrderModule { }
