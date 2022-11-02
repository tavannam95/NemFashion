import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/cart-service/cart-service";
import {StorageService} from "../../shared/service/storage.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  carts: any[] = [];
  subTotal: number = 0;
  totalCart: number = 0;

  constructor(private readonly cartService: CartService,
              public readonly storageService: StorageService,
              ) {
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.cartService.isReload.subscribe((data) => {
        if (data) {
          this.findAllByCustomerId(this.storageService.getIdFromToken());
          this.cartService.isReload.next(false);
        } else {
          this.findAllByCustomerId(this.storageService.getIdFromToken());
        }
      })
    }
  }

  findAllByCustomerId(customerId: number) {
    this.cartService.findAllByCustomerId(customerId).subscribe((res: any) => {
      this.carts = res as any[];
      console.log(res)
      console.log("Nav bar findAllByCustomerId: " + customerId)
      console.log("Nav bar findAllByCustomerId: " + this.carts)
      if (this.carts.length > 0) {
        this.subTotal = this.carts
          .map(c => c.productsDetail.product.price * c.quantity)
          .reduce((value, total) => value + total, 0);
        this.totalCart = this.carts.map(c => c.quantity).reduce((value, total) => value + total);
      } else {
        this.subTotal = 0;
        this.totalCart = 0;
      }
    })
  }

  onDelete(id: number) {
    this.cartService.deleteCart(id);
    this.cartService.isReload.subscribe((data) => {
      if (data) {
        this.findAllByCustomerId(this.storageService.getIdFromToken());
        this.cartService.isReload.next(false);
      }
    })
  }
}
