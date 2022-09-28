import {Routes} from '@angular/router'
import {DashboardComponent} from '../../dashboard/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {NotificationsComponent} from '../../notifications/notifications.component';


export const content_admin: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'user-profile', component: UserProfileComponent},
    {path: 'table-list', component: TableListComponent},
    {path: 'typography', component: TypographyComponent},
    {path: 'icons', component: IconsComponent},
    {path: 'notifications', component: NotificationsComponent},
    // { path: 'notifications',  component: NotificationsComponent },
    {
        path: 'notifications',
        loadChildren: () => import('../../pages/admin/staff-manager/staff.modules').then(m => m.StaffModules),
    },
    {
        path: 'customer',
        loadChildren: () => import('../../pages/admin/customer-manager/customer-manager.module').then(m => m.CustomerManagerModule),
    }
]