import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductRoutingModule} from "./product-routing.module";
import {ProductComponent} from "./product.component";
import {StarsComponent} from "../../../shared/stars/stars.component";
import {HomeModule} from "../home/home.module";

@NgModule({
  declarations: [
     ProductComponent,
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HomeModule
  ]
})
export class ProductModule { }
