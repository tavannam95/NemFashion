import { Injectable } from '@angular/core';
import {OrderDetailApiService} from "./order-detail-api.service";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private readonly orderApiService: OrderDetailApiService) { }

  createOrderDetail(data: any) {
    return this.orderApiService.createOrderDetail(data);
  }

  getAllOrderDetail( idCustome: number ){
     return this.orderApiService.getAllOrderDatailByIdOrder(idCustome) ;
  }

  getAllOrderDetailByOrderAndCustome( idCus: number , idOrder: number ){
     return this.orderApiService.getAllOrderDetailByCustomeAndOrder( idCus, idOrder ) ;
  }
}