import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'app/shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PreparingProductComponent } from '../dialog/preparing-product/preparing-product.component';
import { GhnService } from '../../../../shared/service/ghn/ghn.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  isLoading: boolean = false;
  tabIndex: number = -1;
  allOrder: any;
  status: any;
  orderGhn: any[] = [];
  dateShift: any[] = [];
  listStatus: string[] = [
    'Tất cả',
    'Chờ xác nhận',
    'Chờ lấy hàng',
    'Đang giao',
    'Đã giao',
    'Đơn hủy',
    'Trả hàng/Hoàn tiền'
  ]
  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private ghnService: GhnService,
    private orderSevice: OrderService
  ) { }

  ngOnInit() {
    this.getAllOrder();
    this.getAllOrderGhn();
    this.getDate();
  }

  selectTab(index: any){
    if (index == 0) {
      this.getAllOrder();
    }else if (index == 1 || index == 2) {
      this.findByStatus(index-1);
    }else if (index == 3) {
      
    }
  }

  getStatusGhn(){
    for (let i = 0; i < this.orderGhn.length; i++) {
      this.ghnService.getOrderGhn({order_code : this.orderGhn[i].orderCode}).subscribe(res=>{
        if (res.data.status == 'transporting') {
          this.orderGhn[i].status = 2;
        }else if (res.data.status == 'delivered') {
          this.orderGhn[i].status = 3;
        }else if ('cancel') {
          
        }
      })
    }
    // this.ghnService.getOrderGhn({order_code : this.orderGhn[0].orderCode}).subscribe(res=>{
    //   // this.orderGhn[i].ghnStatus = res.
    //   console.log(res);
      
    // })
  }

  getAllOrderGhn(){
    this.orderService.getOrderGhn().subscribe({
      next: (res) =>{
        this.orderGhn = res;
      }
    })
  }

  
  getDate(){
    this.ghnService.getDate().subscribe({
      next: (res)=>{
        this.dateShift = res.data;
      }
    })
  }

  openPreparingDialog(data: any, dateShift: any){
    let dialogRef = this.matDialog.open(PreparingProductComponent,{
      width: '1000px',
      disableClose: true,
      data: {
        data,
        dateShift
      }
    });
    dialogRef.afterClosed().subscribe(res=>{
      if (res == 'OK') {
        if (this.tabIndex==-1) {
          this.getAllOrder();
        }else{
          this.orderService.findByStatus(this.tabIndex).subscribe(res=>{
            this.allOrder = res;
          });
        }
      }
    })
  }

  findByStatus(event: any){
    this.tabIndex = event;
    if (event==-1) {
      this.getAllOrder();
    }else{
      this.isLoading = true;
      this.orderService.findByStatus(this.tabIndex).subscribe({
        next:(res)=>{
          this.allOrder = res;
          this.isLoading = false;
        },
        error:(e)=>{
          console.log(e);
          this.toastrService.error('Server đang quá tải');
          this.isLoading = false;
        }
      })
    }
  }

  getAllOrder(){
    this.isLoading = true;
    this.orderService.getAllOrder().subscribe({
      next: (res) =>{
        this.allOrder = res;
        for (let i = 0; i < this.allOrder.length; i++) {
          if (this.allOrder[i].orders.orderCode != null && this.allOrder[i].orders.status != 0) {
            this.ghnService.getOrderGhn({order_code : this.allOrder[i].orders.orderCode}).subscribe({
              next: (r)=>{
                this.allOrder[i].orders.status = r.data.status;
              }
            })
          }
        }
        
        this.isLoading = false;
      },
      error: (err) =>{
        console.log(err);
        this.isLoading = false;
      }
    });
  }
}
