import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderManagerComponent} from './order-manager/order-manager.component';
import {OrderRoutingModule} from "./order-routing.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {OrderDetailComponent} from "./order-manager/order-detail/order-detail.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTabsModule} from "@angular/material/tabs";
@NgModule({
    declarations: [
        OrderManagerComponent,
        OrderDetailComponent
    ],
    imports: [
        CommonModule,
        OrderRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatPaginatorModule,
        MatTableModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatTabsModule
    ],
    providers: [OrderDetailComponent]
})
export class OrderModule {
}
