import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'app/shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { PreparingProductComponent } from '../dialog/preparing-product/preparing-product.component';
import { GhnService } from '../../../../shared/service/ghn/ghn.service';
import { PageEvent } from '@angular/material/paginator';
import { FormBuilder } from '@angular/forms';
import { TrimService } from '../../../../shared/service/trim/trim.service';

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
    'Chờ xác nhận',
    'Chờ lấy hàng',
    'Đang giao',
    'Đã giao',
    'Đơn hủy',
    'Trả hàng/Hoàn tiền',
    'Bán tại cửa hàng',
    'Tất cả',
  ]

  dataOrder: any[] = [];

  searchOrderDTO = this.fb.group({
    fullName: [''],
    id: null,
    orderCode: [''],
    status: null
  })

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
    private orderSevice: OrderService,
    private fb: FormBuilder,
    private trimService: TrimService
  ) { }

  ngOnInit() {
    this.getDataOrder();
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
    if (this.tabIndex == 7) {
      this.getAllOrder(this.pageIndex);
    }else{
      this.findByStatus(this.tabIndex);
    }
  }

  searchOrder(){
    this.trimService.inputTrim(this.searchOrderDTO,['fullName','orderCode']);
    this.pageIndex = 0;
    this.pageSize = 10;
    this.searchOrderDTO.patchValue({status:this.tabIndex});
    this.orderService.searchOrder(this.searchOrderDTO.value, this.pageIndex, this.pageSize).subscribe({
      next: (res)=>{
        if (res.length<=0) {
          this.toastrService.warning('Đơn hàng không tồn tại');
        }
        this.allOrder = res;
        if (this.allOrder.length>0) {
          this.totalPage = this.allOrder[0].totalPage;
          this.length = this.allOrder[0].totalElements;
        }
      },
      error: (e)=>{
        console.log(e);
        
      }
    })
  }

  selectTab(index: any){
    this.tabIndex = index;
    if (this.tabIndex==0) {
      this.searchOrderDTO.patchValue({orderCode:''});
    }
    if (index == 7) {
      this.setDefaultPageEvent();
      this.getAllOrder(0);
    }else{
      this.orderService.findAllByStatus(this.tabIndex).subscribe(res=>{
        this.allOrderStatus = res;
        this.length = this.allOrderStatus.length;
      })
      this.setDefaultPageEvent();
      this.findByStatus(this.tabIndex);
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
      autoFocus: false,
      data: {
        data,
        dateShift
      }
    });
    dialogRef.afterClosed().subscribe(res=>{
      if (res == 'OK') {
        if (this.tabIndex==7) {
          this.getAllOrder(0);
        }else{
          this.orderService.findByStatus(this.tabIndex, this.pageIndex, this.pageSize).subscribe(res=>{
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
    this.orderService.findAllByStatus(this.tabIndex).subscribe(res=>{
      this.allOrderStatus = res;
      this.length = this.allOrderStatus.length;
    })
    this.setDefaultPageEvent();
    this.findByStatus(this.tabIndex);
  }

  setLengthAllOrder(){
    let arr = [];
    this.orderService.getDataOrder().subscribe(res=>{
      arr = res;
      this.length = arr.length;
    })
  }

  getAllOrder(page: any){
    this.isLoading = true;
    this.setLengthAllOrder();
    this.orderService.getAllOrder(page,this.pageSize).subscribe({
      next: (res) =>{
        this.allOrder = res;
        console.log(this.allOrder);
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
