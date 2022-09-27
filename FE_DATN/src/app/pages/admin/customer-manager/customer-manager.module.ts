import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CustomerManagerRoutingModule} from './customer-manager-routing.module';
import {CustomerFormComponent} from './customer-form/customer-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {CustomerListComponent} from './customer-list/customer-list.component';


@NgModule({
    declarations: [
        CustomerFormComponent,
        CustomerListComponent
    ],
    imports: [
        CommonModule,
        CustomerManagerRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
    ]
})
export class CustomerManagerModule {
}
