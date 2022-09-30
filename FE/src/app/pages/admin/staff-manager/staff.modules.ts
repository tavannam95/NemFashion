import {NgModule} from '@angular/core';
import {StaffListComponent} from './staff-list/staff-list.component';
import {StaffFormComponent} from './staff-form/staff-form.component';
import {StaffRoutingModule} from './staff-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {DxFileUploaderModule, DxProgressBarModule} from 'devextreme-angular';
import {MatRadioModule} from '@angular/material/radio';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
    declarations: [
       StaffListComponent ,
       StaffFormComponent
    ] ,
    imports: [
        CommonModule,
        StaffRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatInputModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxDropzoneModule,
        DxFileUploaderModule,
        DxProgressBarModule,
        MatRadioModule,
        ReactiveFormsModule,
    ],
    entryComponents: [StaffFormComponent]
})

export class StaffModules {}

