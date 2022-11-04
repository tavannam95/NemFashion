import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderService } from 'app/shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  isLoading: boolean = false;
  displayedColumns: string[] = ['id', 'customer', 'employee', 'total', 'status', 'note', 'feature'];
  dataSource: MatTableDataSource<any>;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private orderService: OrderService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getAllOrder();
  }

  getAllOrder(){
    this.orderService.getAllOrder().subscribe({
      next: (res) =>{
        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) =>{
        console.log(err);
        this.toastrService.error('error');
      }
    });
  }

  verifyOrCancelOrder(row: any, f: number){
    this.orderService.verifyOrCancelOrder(row.id,row,f).subscribe({
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

  //Tim kiem
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
