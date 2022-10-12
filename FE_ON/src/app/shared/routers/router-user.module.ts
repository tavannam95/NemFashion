import { Routes} from "@angular/router";
import {SigninComponent} from "../../pages/home/profile/signin/signin.component";
import {SignupComponent} from "../../pages/home/profile/signup/signup.component";

export const router_user: Routes= [
  { path: 'cart' ,
    loadChildren: () => import('../../pages/home/cart/cart.module').then( m => m.CartModule )
  },
  {
    path: 'home' ,
    loadChildren: () => import('../../pages/home/home/home.module').then( m => m.HomeModule )
  },
  {
    path: 'profile' ,
    loadChildren: () => import('../../pages/home/profile/profile.module').then( m => m.ProfileModule )
  },
  {
    path: 'user-profile' ,
    loadChildren: () => import('../../pages/home/profile/user-proflle/user-profile.module').then( m => m.UserProfileModule )
  },
  {
    path: 'user-order' ,
    loadChildren: () => import('../../pages/home/profile/user-order/user-order.module').then( m => m.UserOrderModule )
  },
  {
    path: 'address-book' ,
    loadChildren: () => import('../../pages/home/profile/address-book/address-book.module').then( m => m.AddressBookModule )
  },
  {
    path: 'products' ,
    loadChildren: () => import('../../pages/home/product/product.module').then( m => m.ProductModule )
  },
  {
    path: 'sign-in' ,
    component: SigninComponent
  },
  {
    path: 'sign-up' ,
    component: SignupComponent
  }
]
