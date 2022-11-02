import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {Constants} from "../../../shared/constants/constants.module";
import {CartService} from "../../../shared/service/cart-service/cart-service";
import {FormBuilder, FormControl, Validator, Validators} from "@angular/forms";
import {
  BehaviorSubject,
  debounce,
  debounceTime,
  distinctUntilChanged,
  shareReplay,
  Subject,
  switchMap,
  timeout
} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {EditAddressComponent} from "./edit-address/edit-address.component";
import {AddressService} from "../../../shared/service/address/address.service";
import {CustomerService} from "../../../shared/service/customer/customer.service";
import {OrderService} from "../../../shared/service/order/order.service";
import {OrderDetailService} from "../../../shared/service/order-detail/order-detail.service";
import {Route, Router} from "@angular/router";
import {StorageService} from "../../../shared/service/storage.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: any[] = [];
  subTotal: number = 0;
  quantity: number = 0;
  cities!: any[];
  districts!: any[];
  wards!: any[];
  address: any;
  customer: any;

  formGroup = this.fb.group({
    city: [-1],
    district: [-1],
    ward: [-1],
    shipName: [''],
    shipPhone: [''],
    note: ['']
  })
  defaultInfoModel: boolean = false;

  constructor(private readonly cartService: CartService,
              private readonly matDialog: MatDialog,
              private readonly fb: FormBuilder,
              private readonly toastService: ToastrService,
              private readonly addressService: AddressService,
              private readonly customerService: CustomerService,
              private readonly orderService: OrderService,
              private readonly orderDetailService: OrderDetailService,
              private readonly route: Router,
              private readonly storageService: StorageService) {

  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.findAllByCustomerId();
      this.findAddressByStatus(this.storageService.getIdFromToken());
    }
    this.getCity();
  }

  findAllByCustomerId() {
    return this.cartService.findAllByCustomerId(this.storageService.getIdFromToken()).subscribe(res => {
      this.carts = res as any[];
      console.log("findAllByCustomerId", this.carts)
      if (this.carts.length > 0) {
        this.subTotal = this.carts
          .map(c => c.productsDetail.product.price * c.quantity)
          .reduce((value, total) => value + total, 0);
      } else {
        this.subTotal = 0;
      }
    })
  }

  //Open dialog xoá 1 đơn hàng
  onDelete(id: number) {
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: 'Bạn có muốn xoá sản phẩm này khỏi giỏ hàng?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.cartService.deleteCart(id);
        this.cartService.isReload.subscribe((result) => {
          if (result) {
            this.findAllByCustomerId();
            this.cartService.isReload.next(false);
          }
        })
      }
    })
  }

  //Dialog xoá tất cả giỏ hàng
  onOpenDialogDeleteAll() {
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: 'Bạn có muốn xoá tất cả sản phẩm khỏi giỏ hàng?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.cartService.deleteAllByCustomerId(this.storageService.getIdFromToken());
        this.cartService.isReload.subscribe((result) => {
          if (result) {
            this.findAllByCustomerId();
            this.cartService.isReload.next(false);
          }
        })
      }
    })
  }

  updateCart(event: any, customerId?: any, productDetailId?: any, quantity?: any, cartQuantity?: any, cartId?: any) {
    const data = {
      customer: {
        id: this.storageService.getIdFromToken(),
      },
      productsDetail: {
        id: productDetailId
      },
      quantity: event.target.value
    }

    if (data.quantity == '' || data.quantity === undefined || data.quantity === null || data.quantity == 0) {
      event.target.value = cartQuantity;
      return;
    }

    // if (data.quantity == 0) {
    //   this.cartService.deleteCart(cartId);
    //   this.cartService.isReload.subscribe((result) => {
    //     if (result) {
    //       this.findAllByCustomerId();
    //       this.cartService.isReload.next(false);
    //     }
    //   })
    //   return;
    // }


    if (data.quantity > quantity) {
      event.target.value = cartQuantity;
      this.toastService.warning("Số không được lớn hơn số lượng còn lại !")
      return;
    }

    this.cartService.updateCart(data).subscribe(data => {
      if (data) {
        this.findAllByCustomerId();
        this.cartService.isReload.next(false);
      }
    })
  }


  getCity() {
    this.addressService.getCity().subscribe(res => {
      this.cities = res as any[];
    })
  }

  getDistrict(code: any) {
    this.addressService.getDistrict(code).subscribe((res: any) => {
      this.districts = res.districts as [];
      this.formGroup.patchValue({district: this.districts[0].name});
      this.getWard(this.districts[0].code);
    })
  }

  getWard(code: any) {
    this.addressService.getWard(code).subscribe((res: any) => {
      this.wards = res.wards as [];
      this.formGroup.patchValue({ward: this.wards[0].name});
    })
  }


  defaultInfo(event: any) {
    if (event.target.value == 'on') {
      this.defaultInfoModel = true
      event.target.value = 'off';
    } else {
      this.defaultInfoModel = false;
      event.target.value = 'on';
    }
    this.defaultInfoModel ? this.formGroup.disable() : this.formGroup.enable();
    this.formGroup.get('note')?.enable();
  }

  checkOut() {
    const address = [];
    const shipPhone = this.formGroup.getRawValue().shipPhone;
    const shipName = this.formGroup.getRawValue().shipName;
    const note = this.formGroup.getRawValue().note;
    let order = {
      shipAddress: '',
      shipPhone: '',
      shipName: '',
      note: note?.trim(),
      customer: {
        id: this.storageService.getIdFromToken()
      },
      employee: {
        id: 1
      },
      total: this.subTotal,
      status: Constants.ORDER_STATUS.WAITING
    }

    if (this.carts.length == 0) {
      this.toastService.warning("Giỏ hàng của bạn đang trống !")
      return;
    }

    if (!this.defaultInfoModel) {
      if (this.formGroup.getRawValue().district === -1 ||
        this.formGroup.getRawValue().city === -1 ||
        this.formGroup.getRawValue().ward === -1 ||
        shipPhone?.trim() === '' || shipName?.trim() === '') {
        this.toastService.warning("Vui lòng nhập đầy đủ thông tin !")
        return;
      }
      if (!shipPhone?.trim().match("^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$")) {
        this.toastService.warning("Số điện thoại không đúng định dạng !")
        return;
      }
      address.push(this.formGroup.getRawValue().ward, this.formGroup.getRawValue().district, this.formGroup.getRawValue().city)
      order.shipAddress = address.join(", ")
      order.shipPhone = shipPhone.trim()
      order.shipName = shipName!.trim()
      console.log(order)
    } else {
      if(!this.address){
        this.toastService.warning("Vui lòng chọn địa chỉ mặc định trước khi thanh toán !");
        return;
      }
      address.push(this.address.ward, this.address.district, this.address.city);
      order.shipAddress = address.join(", ")
      order.shipPhone = this.address.customer.phone
      order.shipName = this.address.customer.fullname
      order.total = this.subTotal
      order.status = Constants.ORDER_STATUS.WAITING
    }
    const checkOutData = {
      order: order,
      listCarts: this.carts
    }
    console.log(checkOutData)
    this.orderService.createOrder(checkOutData).subscribe({
        next: (res) => {
          console.log(res);
          this.toastService.success("Đặt hàng thành công !")
          this.cartService.deleteAllByCustomerId(this.storageService.getIdFromToken());
          this.cartService.isReload.subscribe(rs => {
            if (rs) {
              this.cartService.findAllByCustomerId(this.storageService.getIdFromToken());
              this.carts = [];
              this.subTotal = 0;
              void this.route.navigate(["/profile/user-order"]);
              this.cartService.isReload.next(false);
            }
          })
        },
        error: (err) => {
          if (err.error.code == 'LIMIT_QUANTITY') {
            this.toastService.warning(err.error.message);
            return;
          }
          this.toastService.error("Đặt hàng không thành công !");
        }
      }
    )
  }

  openEditAddressDialog() {
    if (this.address != null) {
      let idAddress = this.address.id;
      this.matDialog.open(EditAddressComponent, {
        width: '50vw',
        height: '21w',
        disableClose: true,
        hasBackdrop: true,
        data: {
          id: idAddress
        }
      }).afterClosed().subscribe(data => {
        if (data !== 'close' && data !== undefined) {
          this.addressService.findAddressById(data).subscribe(data => {
            this.address = data;
          })
        }
      })
    } else {
      this.matDialog.open(EditAddressComponent, {
        width: '50vw',
        height: '21w',
        disableClose: true,
        hasBackdrop: true,
      }).afterClosed().subscribe(data => {
        if (data !== 'close' && data !== undefined) {
          this.addressService.findAddressById(data).subscribe(data => {
            this.address = data;
          })
        }
      })
    }
  }

  findAddressByStatus(customerId: number) {
    this.addressService.findAddressByStatus(customerId).subscribe((res: any) => {
      this.address = res;
      console.log(this.address)
    })
  }

}
