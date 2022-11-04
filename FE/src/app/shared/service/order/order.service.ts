import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderApiService } from './order-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

constructor(private readonly apiService: OrderApiService) { }
getAllOrder() {
  return this.apiService.getAllOrder();
}
verifyOrCancelOrder(id: number, data: any, f: number){
  return this.apiService.verifyOrCancelOrder(id,data,f);
}
}
