import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { OrderService } from '../../../../../shared/service/order/order.service';
import { ProductDetailService } from '../../../../../shared/service/productDetail/product-detail.service';
import { ToastrService } from 'ngx-toastr';
import { OrderDetailService } from '../../../../../shared/service/order-detail/order-detail.service';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { Constant } from '../../../../../shared/constants/Constant';
import { FormControl } from '@angular/forms';
import { startWith, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../../../../../shared/service/product/product.service';
import { ProductDetailOrderComponent } from '../../../selling/selling/product-detail-order/product-detail-order.component';
import { StorageService } from '../../../../../shared/service/storage.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.scss']
})
export class EditOrderComponent implements OnInit {
  productInput = new FormControl('');
  filteredProduct: Observable<any>;
  listProductSearch: any = [];


  isLoading: boolean = false;
  orderDetailsList: any[] = [];
  order: any;
  quantityList = [];
  quantityPresentList = [];
  checkChange: boolean = false;
  productDetail: any;
  orderDetail = {
    order: {id: null},
    productsDetail: {id: null},
    unitprice: null,
    quantity: null,
    status: 1
  }

  displayedColumns: string[] = ['image', 'name', 'price', 'color', 'size', 'quantity', 'function'];
  dataSource: any[] = [];

  constructor(
    private matDialogRef: MatDialogRef<EditOrderComponent>,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private orderService: OrderService,
    private productDetailService: ProductDetailService,
    private toastrService: ToastrService,
    private orderDetailService: OrderDetailService,
    private matDialog: MatDialog,
    private productService: ProductService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.getOrderAndOrderDetails();
    this.getAllProduct();
  }

  closeDialog(check: any){
    if (check == 'submit' && !this.checkChange) {
      return;
    }
    this.matDialogRef.close(check);
  }
  check(i: any){
    this.orderService.updateTotal(this.order.id);
    
  }
  getOrderAndOrderDetails(){
    this.orderService.findById(this.dataDialog.orders.id).subscribe({
      next: res=>{
        this.order = res;
      },
      error: e=>{
        console.log(e);
        
      }
    });
    this.orderDetailService.getOrderDetailByOrderId(this.dataDialog.orders.id).subscribe({
      next: res =>{
        this.orderDetailsList = res;
        this.dataSource = res;
        this.pushQuantity(); 
        console.log(this.dataSource);
        
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
          console.log(error);
          
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
        if (!(value == null || value == undefined)) {
          if (this.checkorderDetailsList(value.id)) {
            
            this.orderDetail.order.id = this.order.id;
            this.orderDetail.productsDetail.id = value.id;
            this.orderDetail.unitprice = value.price;
            this.orderDetail.quantity = value.quantityOrder;
            this.orderDetailService.updateOrderDetail(this.orderDetail).subscribe({
              next: (res) =>{
                this.subtractQuantity(value.id,value.quantityOrder);
                this.orderDetailsList.push(res);
                this.dataSource = this.orderDetailsList;  
                console.log('dataSource');
                console.log(this.dataSource);
                
                   
                this.checkChange = true;
                this.readQuantity();
                    console.log(this.quantityList);
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
                this.orderDetailsList[i].quantity += value.quantityOrder;
                this.orderDetailService.updateOrderDetail(this.orderDetailsList[i]).subscribe({
                  next: (res) =>{
                    this.subtractQuantity(value.id,value.quantityOrder);
                    this.checkChange = true;
                    this.readQuantity();
                    console.log(this.quantityList);
                    
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
              this.checkChange = true;
              this.orderService.setUpdateName(row.order.id,this.storageService.getFullNameFromToken());
              this.toastrService.success('Xóa sản phẩm thành công');
            },
            error: (e)=>{
              console.log(e);
            }
          });
        }
      });
  }
  subtractQuantity(idPD: any, quantity: any){
    this.productDetailService.getOneProductDetail(idPD).subscribe({
      next: (res) =>{
        this.productDetail = res;
        this.productDetail.quantity -= quantity;
        this.productDetailService.updateProductDetail(this.productDetail).subscribe({
          next: (r)=>{
            // console.log('new product detail');
          },
          error: (e) =>{
            console.log(e);
            
          }
        })
      }
    })
  }
  pushQuantity(){
    for (let i = 0; i < this.orderDetailsList.length; i++) {
      this.quantityList.push(this.orderDetailsList[i].quantity);
      this.quantityPresentList.push(this.orderDetailsList[i].quantity);
    }
  }
  readQuantity(){
    this.quantityList = [];
    this.quantityPresentList = [];
    for (let i = 0; i < this.orderDetailsList.length; i++) {
      this.quantityList.push(this.orderDetailsList[i].quantity);
      this.quantityPresentList.push(this.orderDetailsList[i].quantity);
    }
  }
  setQuantity(event: any, index: any, row: any){
    let newQty = event.target.value;
    let oldQty = row.quantity;
    let presentQty = null;
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
      if (newQty==oldQty) {
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
        this.checkChange = true;
        this.quantityList[index] = parseInt(event.target.value);
        console.log(this.quantityList);
      }
    })
  }
  onSubmit(){
    // if (!this.checkChange) {
    //   this.toastrService.warning('Bạn chưa thay đổi thông tin');
    //   return;
    // }
    for (let i = 0; i < this.orderDetailsList.length; i++) {
      this.orderDetailsList[i].quantity = this.quantityList[i];
      this.orderDetailService.updateOrderDetail(this.orderDetailsList[i]).subscribe({
        error: (e)=>{
          console.log(e);
        },
        next: (res) =>{
          console.log('new order detail');
          
          console.log(res);
          this.subtractQuantity(res.productsDetail.id,(this.quantityList[i] - this.quantityPresentList[i]));
        }
      })
    }
  }
}
