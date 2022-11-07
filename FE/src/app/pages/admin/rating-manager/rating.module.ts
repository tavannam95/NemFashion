import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RatingRouterModule} from './rating-router.module';
import {RatingComponent} from './rating.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
      RatingComponent
  ],
  imports: [
    CommonModule,
    RatingRouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatCheckboxModule,
  ]
})
export class RatingModule { }
