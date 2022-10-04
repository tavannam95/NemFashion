import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ProductDetailFormComponent } from './product-detail-form/product-detail-form.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatInputModule} from '@angular/material/input';


@NgModule({
  declarations: [ProductDetailFormComponent],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    NgxDropzoneModule,
    MatCheckboxModule,
    MatInputModule
  ]
})
export class ProductDetailModule { }
