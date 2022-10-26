import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {Constants} from "../../../shared/constants/constants.module";
import {CartService} from "../../../shared/service/cart-service/cart-service";
import {FormControl} from "@angular/forms";
import {debounce, debounceTime, distinctUntilChanged, shareReplay, Subject, switchMap} from "rxjs";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: any[] = [];
  subTotal: number = 0;
  inputChange = new Subject<number>();
  quantity: number = 0;

  constructor(private readonly cartService: CartService,
              private readonly matDialog: MatDialog) {

  }

  ngOnInit(): void {
    this.findAllByCustomerId(33);
  }

  findAllByCustomerId(customerId: number) {
    this.cartService.findAllByCustomerId(customerId).subscribe(res => {
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
            this.findAllByCustomerId(33);
            this.cartService.isReload.next(false);
          }
        })
      }
    })
  }

  deleteAllByCustomerId(customerId: any) {
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: 'Bạn có muốn xoá tất cả sản phẩm khỏi giỏ hàng?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constants.RESULT_CLOSE_DIALOG.CONFIRM) {
        this.cartService.deleteAllByCustomerId(customerId);
        this.cartService.isReload.subscribe((result) => {
          if (result) {
            this.findAllByCustomerId(customerId);
            this.cartService.isReload.next(false);
          }
        })
      }
    })
  }

  updateCart(event: any, customerId?: any, productDetailId?: any, quantity?: any, cartQuantity?: any) {

    const data = {
      customer: {
        id: customerId,
      },
      productsDetail: {
        id: productDetailId
      },
      quantity: event.target.value
    }


    if (data.quantity > quantity) {
      event.target.value = cartQuantity;
      alert("Số không được lớn hơn số lượng còn lại !")
      return;
    }

    this.cartService.updateCart(data).subscribe(data => {
      if (data) {
        this.findAllByCustomerId(customerId)
        this.cartService.isReload.next(false);
      }
    })
    // this.cartService.isReload.subscribe(res => {
    //   if (res) {
    //
    //     this.cartService.isReload.next(false)
    //   }
    // })
    // this.inputChange.next(event.target.value);
    // this.inputChange.pipe(
    //   debounceTime(1000),
    //   distinctUntilChanged()).subscribe(value => {
    //   if (value) {
    //     console.log(value)
    //     data.quantity = value;
    //
    //     this.inputChange.next(0);
    //   }
    // })

  }
}
