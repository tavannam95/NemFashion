import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductDetailComponent} from "./product-detail.component";
import {ProductDetailRoutingModule} from "./product-detail-routing.module";
import {FormsModule} from "@angular/forms";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {HomeModule} from "../home/home.module";

@NgModule({
  declarations: [
    ProductDetailComponent
  ],
    imports: [
        CommonModule,
        ProductDetailRoutingModule,
        FormsModule,
        SlickCarouselModule,
        HomeModule,
    ]
})
export class ProductDetailModule {
}
