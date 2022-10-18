import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailApiService {

constructor(
  private readonly http: HttpClient
) { }

createProductDetail(data: any){
  return this.http.post(ApiConstant.productDetail,data);
}
}
