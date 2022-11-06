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
findByStatus(status: any){
  return this.apiService.findByStatus(status);
}
verifyOrCancelOrder(data: any, status: number){
  return this.apiService.verifyOrCancelOrder(data,status);
}
}
