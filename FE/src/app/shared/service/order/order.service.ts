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
verifyOrder(id: number, data: any){
  return this.apiService.verifyOrder(id,data);
}
}
