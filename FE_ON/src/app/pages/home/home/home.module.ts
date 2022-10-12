import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeRountingModule} from "./home-rounting.module";
import {HomeComponent} from "./home.component";

@NgModule({
  declarations: [
     HomeComponent
  ],
  imports: [
    CommonModule ,
    HomeRountingModule
  ]
})
export class HomeModule { }
