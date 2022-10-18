import { NgModule } from '@angular/core';
import { CommonModule  } from '@angular/common';
import {HomeRountingModule} from "./home-rounting.module";
import {HomeComponent} from "./home.component";
import {StarsComponent} from "../../../shared/stars/stars.component";

@NgModule({
  declarations: [
    HomeComponent,
    StarsComponent
  ],
    imports: [
        CommonModule,
        HomeRountingModule,
    ]
})
export class HomeModule {

}
