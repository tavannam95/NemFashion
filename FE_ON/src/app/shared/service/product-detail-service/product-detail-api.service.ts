import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstrant} from "../../constants/ApiConstrants.module";

@Injectable({
  providedIn: 'root'
})
export class ProductDetailApiService {

  constructor(private readonly http: HttpClient) {
  }

  getProductDetailByProductId(productId: number) {
    return this.http.get(`${ApiConstrant.productDetail}/detail/${productId}`);
  }

  findProductDetailBySizeAndColor(data: any) {
    return this.http.post(`${ApiConstrant.productDetail}/p-detail`, data)
  }

}
