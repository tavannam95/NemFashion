import {NgModule} from '@angular/core';
import {StaffListComponent} from './staff-list/staff-list.component';
import {StaffFormComponent} from './staff-form/staff-form.component';
import {StaffRoutingModule} from './staff-routing.module';

@NgModule({
    declarations: [
       StaffListComponent ,
       StaffFormComponent
    ] ,
    imports: [
        StaffRoutingModule
    ] ,
    entryComponents: [StaffFormComponent]
})

export class StaffModules {}

