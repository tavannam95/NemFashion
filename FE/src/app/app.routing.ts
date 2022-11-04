import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';
import {content_admin} from './shared/router/admin_router';
import {SellingComponent} from './pages/admin/selling/selling/selling.component';
import {AuthGuard} from './shared/guard/auth.guard';
import {RoleGuard} from './shared/guard/role.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
    },
    {
        path: '',
        component: AdminLayoutComponent,
        children: content_admin,
        canActivate: [AuthGuard],
    },
    {
        path: 'selling',
        loadChildren: () => import('./pages/admin/selling/selling.module').then(m => m.SellingModule),
        canActivate: [AuthGuard],
    },
    {
        path: 'login',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes, {
            useHash: true
        })
    ],
    exports: [],
})
export class AppRoutingModule {
}
