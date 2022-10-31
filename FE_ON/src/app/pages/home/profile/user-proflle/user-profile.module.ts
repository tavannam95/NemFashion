import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserProflleComponent} from "./user-proflle.component";
import {UserProfileRoutingModule} from "./user-profile-routing.module";
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { UserProfileImageComponent } from './user-profile-image/user-profile-image.component';
import {NgxDropzoneModule} from "ngx-dropzone";




@NgModule({
  declarations: [
     UserProflleComponent,
     UserProfileFormComponent,
     UserProfileImageComponent
  ],
    imports: [
        CommonModule,
        UserProfileRoutingModule,
        MatFormFieldModule,
        MatInputModule,
        NgxDropzoneModule,

    ]
})
export class UserProfileModule { }
