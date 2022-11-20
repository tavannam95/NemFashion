import {Routes} from '@angular/router'
import {DashboardComponent} from '../../dashboard/overview/dashboard.component';
import {UserProfileComponent} from '../../user-profile/user-profile.component';
import {TableListComponent} from '../../table-list/table-list.component';
import {TypographyComponent} from '../../typography/typography.component';
import {IconsComponent} from '../../icons/icons.component';
import {NotificationsComponent} from '../../notifications/notifications.component';
import {ProductModule} from '../../pages/admin/product/product.module';
import {RoleGuard} from '../guard/role.guard';


export const content_admin: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),

    },
    {
        path: 'staff',
        loadChildren: () => import('../../pages/admin/employee-manager/employee.modules').then(m => m.EmployeeModules),
        canActivate: [RoleGuard],
        data: {
            role: 'SUPER_ADMIN'
        }
    },
    {
        path: 'customer',
        loadChildren: () => import('../../pages/admin/customer-manager/customer-manager.module').then(m => m.CustomerManagerModule),
    },
    {
        path: 'order',
        loadChildren: () => import('../../pages/admin/order/order.module').then(m => m.OrderModule),
    },
    {
        path: 'product',
        loadChildren: () => import('../../pages/admin/product/product.module').then(m => m.ProductModule),
    },
    {
        path: 'productDetail/:id',
        loadChildren: () => import('../../pages/admin/product-detail/product-detail.module').then(m => m.ProductDetailModule),
    },
    {
        path: 'category',
        loadChildren: () => import('../../pages/admin/category-manager/category-manager.module').then(m => m.CategoryManagerModule),
    },
    {
        path: 'rating' ,
        loadChildren: () => import('../../pages/admin/rating-manager/rating.module').then(m => m.RatingModule )
    }

]
