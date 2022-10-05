import { NgModule, AfterViewInit, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductFormComponent } from "./product-form/product-form.component";
import { ProductRoutingModule } from "./product-routing.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ReactiveFormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatTreeModule} from '@angular/material/tree';


@NgModule({
  declarations: [ProductFormComponent, ProductListComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatCardModule,
    MatRippleModule,
    NgxDropzoneModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatTreeModule
  ],
})
export class ProductModule{
  
  constructor() {
  }
  
}
