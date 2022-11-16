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
  orderGhn: any;
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
  }

  check(){
    console.log(this.orderGhn);
    
  }

  selectTab(index: any){
    console.log(index);
    if (index == 0) {
      this.getAllOrder();
    }else if (index == 1 || index == 2) {
      this.findByStatus(index);
    }else if (index == 3) {
      
    }
  }

  getStatusGhn(){
    // for (let i = 0; i < this.orderGhn.length; i++) {
    //   this.ghnService.getOrderGhn({OrderCode : this.orderGhn[i].orderCode}).subscribe(res=>{

    //   })
    // }
    console.log({"OrderCode" : this.orderGhn[0].orderCode});
    
    this.ghnService.getOrderGhn({order_code : this.orderGhn[0].orderCode}).subscribe(
      {
        next: (res)=>{
          console.log(res);
          
        },
        error: (e)=>{
          console.log(e);
          
        }
      }
    )
  }

  getAllOrderGhn(){
    this.orderService.getOrderGhn().subscribe({
      next: (res) =>{
        this.orderGhn = res;
      }
    })
  }

  openPreparingDialog(data: any){
    let dialogRef = this.matDialog.open(PreparingProductComponent,{
      width: '1000px',
      disableClose: true,
      data: data
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
        this.isLoading = false;
      },
      error: (err) =>{
        console.log(err);
        this.isLoading = false;
      }
    });
  }
}
