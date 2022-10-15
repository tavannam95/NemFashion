import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {ToastrModule} from 'ngx-toastr';
import {ConfirmDialogComponent} from './shared/confirm-dialog/confirm-dialog.component';
import {EmployeeDetailComponent} from './pages/admin/employee-manager/employee-detail/employee-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {EmployeeImageComponent} from './pages/admin/employee-manager/employee-image/employee-image.component';
import {NgxDropzoneModule} from 'ngx-dropzone';
import {LoadingComponent} from './shared/loading/loading.component';


@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        ToastrModule.forRoot(),
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        NgxDropzoneModule
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        ConfirmDialogComponent,
        EmployeeDetailComponent,
        EmployeeImageComponent,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
