import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'app/shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { Constant } from '../../../../shared/constants/Constant';
import { MatDialog } from '@angular/material/dialog';
import { PreparingProductComponent } from '../dialog/preparing-product/preparing-product.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  isLoading: boolean = false;
  allOrder: any;
  status: any;
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
    private MatDialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAllOrder();
  }

  openPreparingDialog(data: any){
    let dialogRef = this.MatDialog.open(PreparingProductComponent,{
      width: '1000px',
      disableClose: true,
      data: data
    });
    dialogRef.afterClosed().subscribe(res=>{
      if (res=='OK') {
        window.location.reload();
      }
    })
  }

  findByStatus(event: any){
    if (event==-1) {
      this.getAllOrder();
    }else{
      this.isLoading = true;
      this.orderService.findByStatus(event).subscribe({
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
        console.log(this.allOrder);
      },
      error: (err) =>{
        console.log(err);
        this.isLoading = false;
      }
    });
  }

  getStatus(status: number){
    if (status == 0) {
      return 'Chờ xác nhận';
    }else if (status == 1) {
      return 'Chờ lấy hàng';
    }else if (status == 2) {
      return 'Đang giao';
    }else if (status == 3) {
      return 'Đã giao';
    }else if (status == 4) {
      return 'Đơn hủy';
    }else if (status == 5) {
      return 'Trả hàng/Hoàn tiền';
    }
  }

  verifyOrCancelOrder(row: any, f: number){
    this.orderService.updateStatus(row,f).subscribe({
      next: (res)=>{
        if (f == 1) {
          this.toastrService.success('Xác nhận đơn hàng thành công');
        }else if(f == 4){
          this.toastrService.success('Hủy đơn hàng thành công');
        }else if(f == 0){
          this.toastrService.success('Khôi phục đơn hàng thành công');
        }else{
          this.toastrService.error('Lỗi thao tác')
        }
        this.getAllOrder();
      },
      error: (err)=>{
        if (f == 1) {
          this.toastrService.error('Lỗi xác nhận đơn hàng')
        }else if (f == 4){
          this.toastrService.error('Lỗi hủy đơn hàng');
        }else if (f == 0){
          this.toastrService.error('Lỗi khôi phục đơn hàng');
        }else{
          this.toastrService.error('Lỗi thao tác')
        }
        console.log(err);
        
      }
    });
  }
}
