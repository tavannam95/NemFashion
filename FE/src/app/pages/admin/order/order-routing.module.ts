import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {StaffListComponent} from "../staff-manager/staff-list/staff-list.component";
import {OrderManagerComponent} from "./order-manager/order-manager.component";

const routes: Routes = [
  {
    path: '',
    component: OrderManagerComponent
  }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
