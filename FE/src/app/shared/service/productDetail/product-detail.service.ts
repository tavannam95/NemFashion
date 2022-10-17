import { Injectable } from '@angular/core';
import { ProductDetailApiService } from './product-detail-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

constructor(
  private readonly apiService: ProductDetailApiService
) { }
createProductDetail(data: any){
  this.apiService.createProductDetail(data);
}
}
