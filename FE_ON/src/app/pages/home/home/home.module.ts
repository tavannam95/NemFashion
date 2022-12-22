import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import {HomeRountingModule} from "./home-rounting.module";
import {HomeComponent} from "./home.component";
import {SlickCarouselModule} from "ngx-slick-carousel";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
    declarations: [
        HomeComponent,
    ],
  imports: [
    CommonModule,
    HomeRountingModule,
    SlickCarouselModule,
    MatDialogModule,
  ]
})
export class HomeModule {

}
