import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../shared/service/cart-service/cart-service";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../shared/confirm-dialog/confirm-dialog.component";
import {Constants} from "../../../shared/constants/constants.module";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: any[] = [];
  totalCart: number = 0;

  constructor(private readonly cartService: CartService,
              private readonly matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.findAllByCustomerId(33);
  }

  findAllByCustomerId(customerId: number) {
    this.cartService.findAllByCustomerId(customerId).subscribe(res => {
      this.carts = res as any[];
      console.log(this.carts)
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
        this.cartService.isReload.subscribe(result => {
          if (result) {
            this.findAllByCustomerId(33);
          }
        })
      }
    })

  }
}
