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
        this.isLoading = false;
      },
      error: (err) =>{
        console.log(err);
        this.isLoading = false;
      }
    });
  }
}
