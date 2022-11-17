import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpHeaders,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "../service/storage.service";
import {Router} from "@angular/router";
import { ApiConstant } from '../constants/ApiConstant';
import { Ghn } from '../constants/Ghn';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private readonly storageService: StorageService,
              private readonly router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.storageService.isLoggedIn() && this.storageService.getExpiration()) {
      this.storageService.clearToken();
    }

    const userToken = this.storageService.getToken();
    let httpHeader = new HttpHeaders({
      // 'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
    });

    if (userToken != null) {
      httpHeader = httpHeader.append('Authorization', 'Bearer ' + userToken)
    }
    if (req.url.includes(ApiConstant.ghn)) {
      httpHeader = httpHeader.append('Token', Ghn.TOKEN);
      httpHeader = httpHeader.append('ShopId', Ghn.SHOP_ID);
    }
    if (req.url.includes('https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shift')){
      httpHeader = httpHeader.append('Token', Ghn.TOKEN);
    }

    req = req.clone({
      headers: httpHeader
    });
    return next.handle(req);
  }
}


export const httpInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
