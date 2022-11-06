import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../../../../shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-preparing-product',
  templateUrl: './preparing-product.component.html',
  styleUrls: ['./preparing-product.component.scss']
})
export class PreparingProductComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private OrderService: OrderService,
    private ToastrService: ToastrService,
    private matDialogRef: MatDialogRef<PreparingProductComponent>
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
  }

  verifyOrCancelOrder(){
    this.OrderService.verifyOrCancelOrder(this.dataDialog,1).subscribe({
      next:(res)=>{
        this.ToastrService.success('Chuẩn bị hàng thành công')
      },
      error:(e)=>{
        this.ToastrService.error('Lỗi chuẩn bị hàng, vui lòng thử lại');
      }
    })
    this.matDialogRef.close('OK');
  }

}
