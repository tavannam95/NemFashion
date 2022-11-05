import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  allOrder: any;

  constructor(
      private orderService: OrderService,
      private toastrService: ToastrService
    ) { }

  ngOnInit() {
    this.getAllOrder();
  }

  getAllOrder(){
    return this.orderService.getAllOrder().subscribe({
      next: (res) =>{
        this.allOrder = res;
        console.log(this.allOrder);
        this.toastrService.success("ok");
      },
      error: (e)=>{
        this.toastrService.error("error");
      }
    });
  }

}
