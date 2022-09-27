import {NgModule} from '@angular/core';
import {StaffListComponent} from './staff-list/staff-list.component';
import {StaffFormComponent} from './staff-form/staff-form.component';
import {StaffRoutingModule} from './staff-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    declarations: [
       StaffListComponent ,
       StaffFormComponent
    ] ,
    imports: [
        StaffRoutingModule,
        MatFormFieldModule
    ],
    entryComponents: [StaffFormComponent]
})

export class StaffModules {}

