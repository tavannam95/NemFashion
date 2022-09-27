import {RouterModule, Routes} from '@angular/router';
import {StaffListComponent} from './staff-list/staff-list.component';
import {NgModule} from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: StaffListComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class StaffRoutingModule {

}
