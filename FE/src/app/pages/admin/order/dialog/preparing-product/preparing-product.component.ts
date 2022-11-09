import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../../../../shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../../../../shared/service/contact/contact.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-preparing-product',
  templateUrl: './preparing-product.component.html',
  styleUrls: ['./preparing-product.component.scss']
})
export class PreparingProductComponent implements OnInit {

  contact: any;

  data = this.fb.group({
    "payment_type_id": 2,
    "note": [''],
    "from_name":"NEM Fashion",
    "from_phone":"0968666888",
    "from_address":"Trịnh Văn Bô",
    "from_ward_name":"Phường Xuân Phương",
    "from_district_name":"Quận Nam Từ Liêm",
    "from_province_name":"Hà Nội",
    "required_note": [''],
    "return_name":"NEM Fashion",
    "return_address":"Trịnh Văn Bô",
    "return_ward_name":"Phường Xuân Phương",
    "return_district_name":"Quận Nam Từ Liêm",
    "return_province_name":"Hà Nội",
    "client_order_code": [''],
    "return_phone": "0968666888",
    "to_name": [''],
    "to_address": [''],
    "to_ward_name":[''],
    "to_district_name":[''],
    "to_province_name":[''],
    "to_phone": [''],
    "cod_amount": [''],
    "weight": [''],
    "length": 1,
    "width": 19,
    "height": 10,
    "content": [''],
    "pick_station_id": 0,
    "deliver_station_id": null,
    "insurance_value": [''],
    "service_id": 0,
    "service_type_id":2,
    "coupon":null,
    "pick_shift":null,
    "pickup_time": [''],
    "items": [
      {
          "name":[''],
          "code":[''],
          "quantity": [''],
          "price": [''],
          "length": [''],
          "width": [''],
          "height": [''],
          "category": 
          {
              "id":['']
          }
      }
      
  ]
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private OrderService: OrderService,
    private ToastrService: ToastrService,
    private matDialogRef: MatDialogRef<PreparingProductComponent>,
    private contactService: ContactService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
    this.getDefaultContact();
  }

  verifyOrCancelOrder(){
    this.OrderService.updateStatus(this.dataDialog,1).subscribe({
      next:(res)=>{
        this.ToastrService.success('Chuẩn bị hàng thành công')
      },
      error:(e)=>{
        this.ToastrService.error('Lỗi chuẩn bị hàng, vui lòng thử lại');
      }
    })
    this.matDialogRef.close('OK');
  }

  getDefaultContact(){
    this.contactService.getDafaultContact().subscribe(res=>{
      this.contact = res;
      console.log(this.contact);
      
    })
  }

}
