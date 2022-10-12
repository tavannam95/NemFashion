import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";

const router: Routes = [
  {
    path: '',
    component: HomeComponent 
  }
]

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})
export class HomeRountingModule { }
