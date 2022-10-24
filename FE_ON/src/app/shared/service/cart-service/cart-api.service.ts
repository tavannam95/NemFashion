import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstrant} from "../../constants/ApiConstrants.module";

@Injectable({
  providedIn: 'root'
})
export class CartApiService {

  constructor(private readonly http: HttpClient) {
  }

  addToCart(data: any) {
    return this.http.post(`${ApiConstrant.cart}`, data);
  }

  findAllByCustomerId(customerId: any) {
    return this.http.get(`${ApiConstrant.cart}/${customerId}`);
  }

}
