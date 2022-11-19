import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'app/shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PreparingProductComponent } from '../dialog/preparing-product/preparing-product.component';
import { GhnService } from '../../../../shared/service/ghn/ghn.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  isLoading: boolean = false;
  tabIndex: number = 0;
  allOrder: any[] = [];
  allOrderStatus: any[] = [];
  status: any;
  totalPage: any;
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

  dataOrder: any[] = [];

  //Paginator
  length = 0;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent;

  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService,
    private matDialog: MatDialog,
    private ghnService: GhnService,
    private orderSevice: OrderService
  ) { }

  ngOnInit() {
    this.getDataOrder();
    this.getAllOrder(0);
    this.getAllOrderGhn();
    this.getDate();
  }

  setDefaultPageEvent(){
    this.pageSize = 10;
    this.pageIndex = 0;
  }

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    if (this.tabIndex == 0) {
      this.getAllOrder(this.pageIndex);
    }else if (this.tabIndex == 1 || this.tabIndex ==2) {
      this.findByStatus(this.tabIndex-1);
    }
  }

  selectTab(index: any){
    this.tabIndex = index;
    if (index == 0) {
      this.setDefaultPageEvent();
      this.getAllOrder(0);
    }else{
      this.orderService.findAllByStatus(this.tabIndex-1).subscribe(res=>{
        this.allOrderStatus = res;
        this.length = this.allOrderStatus.length;
      })
      this.setDefaultPageEvent();
      this.findByStatus(this.tabIndex-1);
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
        if (this.tabIndex==0) {
          this.getAllOrder(0);
        }else{
          this.orderService.findByStatus(this.tabIndex-1, this.pageIndex, this.pageSize).subscribe(res=>{
            this.allOrder = res;
          });
        }
      }
    })
  }

  findByStatus(index: any){
    if (index==-1) {
      this.getAllOrder(0);
    }else{
      this.isLoading = true;
      this.orderService.findByStatus(index, this.pageIndex, this.pageSize).subscribe({
        next:(res)=>{
          this.allOrder = res;
          this.isLoading = false;
          // for (let i = 0; i < this.allOrder.length; i++) {
          //   if (this.allOrder[i].orders.orderCode != null && this.allOrder[i].orders.status != 0) {
          //     this.ghnService.getOrderGhn({order_code : this.allOrder[i].orders.orderCode}).subscribe({
          //       next: (r)=>{
          //         this.allOrder[i].orders.status = r.data.status;
          //       }
          //     })
          //   }
          // }
        },
        error:(e)=>{
          console.log(e);
          this.toastrService.error('Server đang quá tải');
          this.isLoading = false;
        }
      })
    }
  }

  getDataOrder(){
    this.orderService.getDataOrder().subscribe(res=>{
      this.dataOrder = res;
      this.length = this.dataOrder.length;
    })
  }

  getAllOrder(page: any){
    this.isLoading = true;
    this.orderService.getAllOrder(page,this.pageSize).subscribe({
      next: (res) =>{
        this.allOrder = res;
        this.totalPage = res.totalPage;
        if (this.allOrder.length>0) {
          this.totalPage = this.allOrder[0].totalPage;
        }
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
