import {NgModule} from '@angular/core';
import {DashboardComponent} from './dashboard.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
    imports: [
        DashboardRoutingModule,
        MatTooltipModule,
        MatTooltipModule,
    ],

    declarations: [
        DashboardComponent ,
    ]
})

export class DashboardModule {}
