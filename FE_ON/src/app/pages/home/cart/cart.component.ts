import {Component, OnInit} from '@angular/core';
import {CartService} from "../../../shared/service/cart-service/cart-service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts: any[] = [];

  constructor(private readonly cartService: CartService) {
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

}
