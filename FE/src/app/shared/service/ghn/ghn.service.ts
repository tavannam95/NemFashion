import { Injectable } from '@angular/core';
import { GhnApiService } from './ghn-api.service';

@Injectable({
  providedIn: 'root'
})
export class GhnService {

  constructor(
    private ghnApiService: GhnApiService
  ) { }

  createOrderGhn(data: any){
    return this.ghnApiService.createOrderGhn(data);
  }
  getOrderGhn(orderCode: any){
    return this.ghnApiService.getOrderGhn(orderCode);
  }

}
