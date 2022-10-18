import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeeListComponent} from "../employee-manager/employee-list/employee-list.component";
import {OrderManagerComponent} from "./order-manager/order-manager.component";
import {SellingComponent} from "../selling/selling/selling.component";

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
