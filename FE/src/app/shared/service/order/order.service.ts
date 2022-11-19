import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderApiService } from './order-api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly apiService: OrderApiService) { }

  getDataOrder(){
    return this.apiService.getDataOrder();
  }

  getAllOrder(page: any, size: any) {
    return this.apiService.getAllOrder(page,size);
  }

  getOrderGhn(){
    return this.apiService.getOrderGhn();
  }

  findByStatus(status: any, page: any, size: any){
    return this.apiService.findByStatus(status,page,size);
  }

  findAllByStatus(status: any){
    return this.apiService.findAllByStatus(status);
  }

  updateStatus(data: any, status: number){
    return this.apiService.updateStatus(data,status);
  }

}
