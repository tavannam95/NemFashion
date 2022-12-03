import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../../../shared/service/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../../../../../shared/service/contact/contact.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { OrderDetailService } from '../../../../../shared/service/order-detail/order-detail.service';
import { GhnService } from '../../../../../shared/service/ghn/ghn.service';
import { PrintOrderDialogComponent } from '../print-order-dialog/print-order-dialog.component';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../../../shared/constants/Constant';
import { startWith, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../../../../../shared/service/product/product.service';
import { ProductDetailOrderComponent } from '../../../selling/selling/product-detail-order/product-detail-order.component';
import { ProductDetailService } from '../../../../../shared/service/productDetail/product-detail.service';
import { EditAddressDialogComponent } from '../edit-address-dialog/edit-address-dialog.component';
import { StorageService } from '../../../../../shared/service/storage.service';
import { EditOrderComponent } from '../edit-order/edit-order.component';

@Component({
  selector: 'app-preparing-product',
  templateUrl: './preparing-product.component.html',
  styleUrls: ['./preparing-product.component.scss']
})
export class PreparingProductComponent implements OnInit {
  productInput = new FormControl('');
  filteredProduct: Observable<any>;
  listProductSearch: any = [];

  updateName: any;
  orderDetailsList: any[] = [];
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
  productDetail: any;
  orderDetail = {
    order: {id: null},
    productsDetail: {id: null},
    unitprice: null,
    quantity: null,
    status: 1
  }

  displayedColumns: string[] = ['image', 'name', 'price', 'color', 'size', 'quantity'];
  dataSource: any[] = [];

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
    private matDialog: MatDialog,
    private productService: ProductService,
    private productDetailService: ProductDetailService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
    // this.getOrder();
    this.updateName = this.storageService.getFullNameFromToken();
    this.order = this.dataDialog.data.orders;
    // this.order.updateName = this.storageService.getFullNameFromToken();
    this.dataSource = this.dataDialog.data.orderDetailsList;
    this.orderDetailsList = this.dataDialog.data.orderDetailsList;
    this.dateShift = this.dataDialog.dateShift;
    this.getDefaultContact();
    this.getWeight();
    this.getAllProduct();
  }
  openEditOrder(){
    let dialogRef = this.matDialog.open(EditOrderComponent,{
      width: '800px',
      data: this.dataDialog.data,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(res=>{
      console.log(res);
      if (res=='submit') {
        this.getOrder();  
      }
      
    })

  }

  transporting(){
    this.matDialog
      .open(ConfirmDialogComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {
          message: "Chuyển đơn hàng thành đang giao?",
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.order.updateName = this.updateName;
          this.orderService.updateStatus(this.order,2).subscribe({
            next: res=>{
              this.toastrService.success('Chuyển trạng thái thành công');
              this.matDialogRef.close('OK');
            },
            error: e=>{
              this.toastrService.error('Chuyển trạng thái thất bại');
              console.log(e);
              
            }
          })
        }
      });
  }

  getOrder(){
    this.orderService.findById(this.dataDialog.data.orders.id).subscribe({
      next: res=>{
        this.order = res;
        console.log('Old Order');
        console.log(this.order);
        this.orderDetailService.getOrderDetailByOrderId(this.dataDialog.data.orders.id).subscribe({
          next: res=>{
            this.dataSource = res;
            this.orderDetailsList = res;
            console.log('orderDetailsList');
            console.log(this.orderDetailsList);
            let total = 0;
            for (let i = 0; i < this.orderDetailsList.length; i++) {
              total += (this.orderDetailsList[i].unitprice*this.orderDetailsList[i].quantity);
            }
            this.order.total = total;
            this.order.updateName = this.storageService.getFullNameFromToken();
            this.orderService.updateOrder(this.order).subscribe({
              next: res=>{
                this.order = res;
                console.log('New Order');
                console.log(this.order);
                
              },
              error: e=>{
                console.log(e);
              }
            })
          }
        })
      },
      error: e=>{
        console.log(e);
      }
    });
    
  }

  removeOrderDetail(row: any){
    console.log(row);
    this.matDialog
      .open(ConfirmDialogComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {
          message: "Bạn có muốn xóa sản phẩm khỏi đơn hàng?",
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.orderDetailService.delete(row.id).subscribe({
            next: (res)=>{
              this.subtractQuantity(row.productsDetail.id,(0-row.quantity));
              this.toastrService.success('Thanh cong');
            },
            error: (e)=>{
              console.log(e);
              this.toastrService.error('Error');
            }
          });
        }
      });
  }

  addAddress(){
    this.matDialog.open(EditAddressDialogComponent,{
      width: '50%',
      disableClose: true
    })
  }

  updateQuantity(event: any,row: any){
    let newQty = event.target.value;
    let oldQty = row.quantity;
    let presentQty = null;
    console.log('newQty');
    console.log(newQty);
    if (event.target.value=='') {
      event.target.value = oldQty;
      this.toastrService.error('Số lượng không được để trống')
      return;
    }
    if (event.target.value<=0) {
      event.target.value = oldQty;
      this.toastrService.warning('Số lượng phải lớn hơn 0')
      return;
    }
    this.productDetailService.getOneProductDetail(row.productsDetail.id).subscribe(res=>{
      presentQty = res.quantity;
      console.log('Present QTY');
      console.log(presentQty);
      if (newQty==oldQty) {
        console.log('No change');
        return;
      }else if (presentQty<=0) {
        event.target.value = oldQty;
        this.toastrService.warning('Số lượng sản phẩm đã hết');
        return;
      }else if ((newQty-oldQty)>presentQty) {
        event.target.value = oldQty;
        this.toastrService.warning('Số lượng còn trong kho: ' + presentQty);
        return;
      }else if (newQty!=oldQty&&(newQty-oldQty)<presentQty) {
        row.quantity = newQty;
        this.orderDetailService.updateOrderDetail(row).subscribe({
              next: (res)=>{
                console.log('res update orderDetail');
                console.log(res);
                this.subtractQuantity(row.productsDetail.id,(newQty-oldQty));
              },
              error: (e)=>{
                console.log(e);
              }
            })
      }
    })
    
  }

  getAllProduct() {
    this.productService.getAllProduct().subscribe({
        next: resp => {
            this.listProductSearch = resp;
            this.productFilter();
        },
        error: error => {

        }
    })
  }
  openDialog(product: any) {
    this.productInput.setValue('');
    this.matDialog.open(ProductDetailOrderComponent, {
        width: '40vw',
        disableClose: true,
        hasBackdrop: true,
        data: {
            product: product
        }
    }).afterClosed().subscribe(value => {
      console.log(value);
        if (!(value == null || value == undefined)) {
          if (this.checkorderDetailsList(value.id)) {
            console.log('Mới');
            
            this.orderDetail.order.id = this.order.id;
            this.orderDetail.productsDetail.id = value.id;
            this.orderDetail.unitprice = value.price;
            this.orderDetail.quantity = value.quantityOrder;
            this.orderDetailService.updateOrderDetail(this.orderDetail).subscribe({
              next: (res) =>{
                this.subtractQuantity(value.id,value.quantityOrder);
                this.orderDetailsList.push(res);
                this.dataSource = [this.orderDetailsList];                
                this.toastrService.success('Thêm sản phẩm thành công');
                return;
              },
              error: (e) =>{
                console.log(e);
                this.toastrService.error('Thêm sản phẩm thất bại');
              }
            })
            
          }else{
            for (let i = 0; i < this.orderDetailsList.length; i++) {
              if (this.orderDetailsList[i].productsDetail.id == value.id) {
                console.log('Cộng');
                this.orderDetailsList[i].quantity += value.quantityOrder;
                this.orderDetailService.updateOrderDetail(this.orderDetailsList[i]).subscribe({
                  next: (res) =>{
                    this.subtractQuantity(value.id,value.quantityOrder);
                    this.toastrService.success('Thêm sản phẩm thành công');
                  },
                  error: (e) =>{
                    console.log(e);
                    this.toastrService.error('Thêm sản phẩm thất bại');
                    
                  }
                })
              }
            }
          }
        }
      }
    )
  }

  checkorderDetailsList(id: any){
    for (let i = 0; i < this.orderDetailsList.length; i++) {
      if (this.orderDetailsList[i].productsDetail.id == id) {
        return false;
      }
    }
    return true;
  }

  subtractQuantity(idPD: any, quantity: any){
    console.log(idPD);
    
    this.productDetailService.getOneProductDetail(idPD).subscribe({
      next: (res) =>{
        console.log(res);
        this.productDetail = res;
        this.productDetail.quantity -= quantity;
        this.productDetailService.updateProductDetail(this.productDetail).subscribe({
          next: (r)=>{
            console.log(r);
            
          },
          error: (e) =>{
            console.log(e);
            
          }
        })
      }
    })
  }

  productFilter() {
    this.filteredProduct = this.productInput.valueChanges.pipe(
        startWith(''),
        map(value => this._filterproduct(value || '')),
    );
  }
  _filterproduct(value: any): any[] {
    var filterValue;
    if (isNaN(value)) {
        filterValue = value.toLowerCase();
    } else {
        filterValue = value;
    }
    return this.listProductSearch.filter(option => option.name.toLowerCase().includes(filterValue)
        || option.name.includes(filterValue));
  }

  cancelOrder(){
    this.isLoading = true;
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn hủy đơn không?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        //Hủy đơn trên GHN
        this.ghnService.cancelOrder({order_codes:[this.order.orderCode]}).subscribe({
          next: (res) =>{
            //Update order status DB
            this.order.updateName = this.storageService.getFullNameFromToken();
            this.orderService.updateStatus(this.order,4).subscribe({
              next: (res)=>{
                this.isLoading = false;
                this.checkCancelOrder = true;
                for (let i = 0; i < this.orderDetailsList.length; i++) {
                  this.subtractQuantity(this.orderDetailsList[i].productsDetail.id,(0-this.orderDetailsList[i].quantity));
                }
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

  cancelStatus(){
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
          message: 'Bạn có muốn hủy đơn không?'
      }
  }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.order.updateName = this.updateName;
        this.orderService.updateStatus(this.order,4).subscribe({
          next: (res)=>{
            for (let i = 0; i < this.orderDetailsList.length; i++) {
              this.subtractQuantity(this.orderDetailsList[i].productsDetail.id,(0-this.orderDetailsList[i].quantity));
            }
            this.matDialogRef.close('OK');
            this.toastrService.success('Hủy đơn thành công');
          },
          error: (e)=>{
            this.toastrService.error('Hủy đơn thất bại');
            console.log(e);
            
          }
        })
      }
  })
  }
  onSubmit(){
    this.matDialog
      .open(ConfirmDialogComponent, {
        disableClose: true,
        hasBackdrop: true,
        data: {
          message: "Bạn có muốn xác nhận đơn hàng?",
        },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
          this.createOrderGhn();
        }
      });
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
        this.order.updateName = this.storageService.getFullNameFromToken();
        this.orderService.updateStatus(this.order,1).subscribe(res=>{
          this.matDialogRef.close('OK');
          this.toastrService.success(this.resultOrder.message_display);
          this.isLoading = false;
        });
      },
      error: (e)=>{
        this.isLoading = false;
        console.log(e);
        this.toastrService.error('Lỗi xác nhận đơn')
      }
    });
  }

  printOrderCode(){
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
  }
}
