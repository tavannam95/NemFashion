import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailService {

constructor(
  private readonly apiService: ProductDetailService
) { }
createProductDetail(data: any){
  this.apiService.createProductDetail(data);
}
}
