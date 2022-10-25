import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CartRoutingModule} from "./cart-routing.module";
import {CartComponent} from "./cart.component";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    CartComponent
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatDialogModule
  ]
})

export class CartModule { }
