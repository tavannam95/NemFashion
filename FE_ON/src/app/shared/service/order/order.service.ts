import { Injectable } from '@angular/core';
import {OrderApiService} from "./order-api.service";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly orderApiService: OrderApiService) { }

  createOrder(data: any) {
    return this.orderApiService.createOrder(data);
  }
}
