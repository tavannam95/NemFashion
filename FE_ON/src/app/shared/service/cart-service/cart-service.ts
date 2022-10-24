import {Injectable} from '@angular/core';
import {CartApiService} from "./cart-api.service";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  isReload: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private readonly cartApi: CartApiService,
             ) {
  }

  addToCart(data: any) {
    return this.cartApi.addToCart(data).subscribe({
      next: (res) => {
        console.log(res);
        this.isReload.next(true);
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  findAllByCustomerId(customerId: any) {
    return this.cartApi.findAllByCustomerId(customerId);
  }


}
