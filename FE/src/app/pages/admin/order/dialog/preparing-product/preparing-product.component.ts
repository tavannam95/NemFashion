import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../../../shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../../../../shared/service/contact/contact.service';
import { FormBuilder, Validators } from '@angular/forms';
import { OrderDetailService } from '../../../../../shared/service/order-detail/order-detail.service';
import { GhnService } from '../../../../../shared/service/ghn/ghn.service';
import { PrintOrderDialogComponent } from '../print-order-dialog/print-order-dialog.component';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../../../shared/constants/Constant';

@Component({
  selector: 'app-preparing-product',
  templateUrl: './preparing-product.component.html',
  styleUrls: ['./preparing-product.component.scss']
})
export class PreparingProductComponent implements OnInit {
  checkCancelOrder = false;
  isLoading: boolean = false;
  requiredNote: string = 'KHONGCHOXEMHANG';
  contact: any;
  orderDetails: any[];
  weight: any;
  items: any[] = [];
  order: any;
  resultOrder: any;
  dateShift: any[] = [];
  printOrder: any;

  data = this.fb.group({
    "payment_type_id": 2,
    "note": [''],
    "from_name":[''],
    "from_phone":[''],
    "from_address":[''],
    "from_ward_name":[''],
    "from_district_name":[''],
    "from_province_name":[''],
    "required_note": [''],
    "return_name":[''],
    "return_address":[''],
    "return_ward_name":[''],
    "return_district_name":[''],
    "return_province_name":[''],
    "client_order_code": [''],
    "return_phone":[''],
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
    "coupon":[''],
    "pick_shift": null,
    "pickup_time": ['',Validators.required],
    "items": ['']
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private orderService: OrderService,
    private toastrService: ToastrService,
    private matDialogRef: MatDialogRef<PreparingProductComponent>,
    private contactService: ContactService,
    private fb: FormBuilder,
    private orderDetailService: OrderDetailService,
    private ghnService: GhnService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.order = this.dataDialog.data;
    console.log(this.order);
    
    this.dateShift = this.dataDialog.dateShift;
    this.getDefaultContact();
    this.getWeight();
  }

  cancelOrder(){
    this.isLoading = true;
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn hủy đơn?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        //Hủy đơn trên GHN
        this.ghnService.cancelOrder({order_codes:[this.order.orderCode]}).subscribe({
          next: (res) =>{
            //Update order status DB
            this.orderService.updateStatus(this.order,4).subscribe({
              next: (res)=>{
                this.isLoading = false;
                this.checkCancelOrder = true;
                this.matDialogRef.close('OK');
                this.toastrService.success('Hủy đơn hàng thành công');
              },
              error:(e)=>{
                console.log(e);
                this.isLoading = false;
                this.toastrService.error('Hủy đơn thất bại');
              }
            });
          },
          error: (e)=>{
            console.log(e);
            this.isLoading = false;
            this.toastrService.error('Hủy đơn thất bại');
          }
        })
      }
      this.isLoading = false;
    })
    
  }

  check(){
    
  }

  getDefaultContact(){
    this.contactService.getDafaultContact().subscribe(res=>{
      this.contact = res;
    })
  }

  getWeight(){
    this.orderDetailService.getOrderDetailByOrderId(this.order.id).subscribe(res=>{
      this.orderDetails = res;
      let weight = 0;
      for (let i = 0; i < this.orderDetails.length; i++) {
        weight += (this.orderDetails[i].productsDetail.product.weight*this.orderDetails[i].quantity);
        this.items.push({
          name: this.orderDetails[i].productsDetail.product.name,
          quantity: this.orderDetails[i].quantity,
          // weight: this.orderDetails[i].productsDetail.product.weight
        });
      }
      this.weight = weight;
    })
  }

  isFormValid() : boolean { 
    return this.data.disabled ? true : this.data.valid
  }


  createOrderGhn(){
    this.isLoading = true;
    let insurance_value = 0;
    if (this.order.total<=1000000) {
      insurance_value = 1000000;
    }else{
      insurance_value = 5000000;
    }

    let address = this.order.shipAddress+"";
    let addressArr = address.split(', ');
    let to_address;
    let to_ward_name;
    let to_district_name;
    let to_province_name;
    if (addressArr.length>3) {
      to_address = addressArr[0];
      to_ward_name = addressArr[1];
      to_district_name = addressArr[2];
      to_province_name = addressArr[3];
    }else{
      to_address = "Đc: ";
      to_ward_name = addressArr[0];
      to_district_name = addressArr[1];
      to_province_name = addressArr[2];
    }
    this.data.patchValue({
      "from_name":this.contact.name,
      "from_phone":this.contact.phone,
      "from_address":this.contact.other,
      "from_ward_name":this.contact.ward_name,
      "from_district_name":this.contact.district_name,
      "from_province_name":this.contact.city_name,
      "return_name":this.contact.name,
      "return_address":this.contact.other,
      "return_ward_name":this.contact.ward_name,
      "return_district_name":this.contact.district_name,
      "return_province_name":this.contact.city_name,
      "return_phone":this.contact.phone,
      "to_name": this.order.shipName,
      "to_address":to_address,
      "to_ward_name":to_ward_name,
      "to_district_name":to_district_name,
      "to_province_name":to_province_name,
      "to_phone":this.order.shipPhone,
      "cod_amount": this.order.total,
      "content": this.order.note,
      "insurance_value": insurance_value,
      "required_note": this.requiredNote,
      "weight": this.weight,
      "items": this.items,
      "client_order_code": this.order.id+"",
      "note": this.order.note
    })
    this.ghnService.createOrderGhn(this.data.value).subscribe({
      next: (res)=>{
        this.resultOrder = res;
        this.order.orderCode = this.resultOrder.data.order_code;
        this.ghnService.genToken({order_codes:[this.order.orderCode]}).subscribe({
          next: (res)=>{
            this.printOrder = res.data.token;
            this.matDialog.open(PrintOrderDialogComponent,{
              data: this.printOrder
            })
          },
          error: (e)=>{
            console.log(e);
            
          }
        });
        this.orderService.updateStatus(this.order,1).subscribe(res=>{
          this.matDialogRef.close('OK');
          this.toastrService.success(this.resultOrder.message_display);
          this.isLoading = false;
        });
        // console.log({order_codes: [this.order.orderCode]});
        
      },
      error: (e)=>{
        this.isLoading = false;
        console.log(e);
        this.toastrService.error('Lỗi xác nhận đơn')
      }
    });
  }

}
