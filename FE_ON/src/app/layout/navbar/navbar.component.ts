import {Component, OnInit} from '@angular/core';
import {CartService} from "../../shared/service/cart-service/cart-service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  carts: any[] = [];
  subTotal: number = 0;

  constructor(private readonly cartService: CartService) {
  }

  ngOnInit(): void {
    this.cartService.isReload.subscribe(data => {
      if (data) {
        this.findAllByCustomerId(33);
      } else {
        this.findAllByCustomerId(33);
      }
    })
  }

  findAllByCustomerId(customerId: number) {
    this.cartService.findAllByCustomerId(customerId).subscribe(res => {
      this.carts = res as any[];
      this.subTotal = this.carts
        .map(c => c.productsDetail.product.price * c.quantity)
        .reduce((value, total) => value + total, 0);
      console.log(this.subTotal)
    })
  }
}
