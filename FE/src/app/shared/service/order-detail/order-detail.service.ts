import { Injectable } from '@angular/core';
import { OrderDetailApiService } from './order-detail-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailService {

  constructor(private orderDetailService: OrderDetailApiService) { }

  getOrderDetailByOrderId(orderId: any){
    return this.orderDetailService.getOrderDetailByOrderId(orderId);
  }
}
