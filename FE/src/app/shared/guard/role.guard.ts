import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {StorageService} from '../service/storage.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {

    constructor(private readonly storageService: StorageService,  private readonly toastService: ToastrService) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.storageService.getRoleFromToken() === 'ROLE_SUPER_ADMIN') {
            return true;
        }
        const check = this.storageService.getRoleFromToken() === route.data['role'];
        if (!check) {
            this.toastService.warning(route.data['message']);
        }
        return check;
    }

}
