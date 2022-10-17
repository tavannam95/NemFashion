import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from "@angular/material/tabs";
import {SellingComponent} from "./selling/selling.component";
import {SellingRoutingModule} from "./selling-routing.module";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from '@angular/material/input';
import {MatBadgeModule} from '@angular/material/badge';
import {MatSidenavModule} from "@angular/material/sidenav";
@NgModule({
    declarations: [SellingComponent],
    imports: [
        CommonModule,
        MatTabsModule,
        SellingRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatBadgeModule,
        MatSidenavModule
    ]
})
export class SellingModule {
}
