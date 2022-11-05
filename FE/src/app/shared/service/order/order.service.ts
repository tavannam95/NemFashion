import { Injectable } from '@angular/core';
import { OrderApiService } from './order-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private orderApiService: OrderApiService) { }

  getAllOrder(){
    return this.orderApiService.getAllOrder();
  }
}
