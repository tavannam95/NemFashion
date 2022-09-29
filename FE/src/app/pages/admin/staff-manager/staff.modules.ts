import {NgModule} from '@angular/core';
import {StaffListComponent} from './staff-list/staff-list.component';
import {StaffFormComponent} from './staff-form/staff-form.component';
import {StaffRoutingModule} from './staff-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

@NgModule({
    declarations: [
       StaffListComponent ,
       StaffFormComponent
    ] ,
    imports: [
        StaffRoutingModule,
        MatFormFieldModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        MatTableModule,
    ],
    entryComponents: [StaffFormComponent]
})

export class StaffModules {}

