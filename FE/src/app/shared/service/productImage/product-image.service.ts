import { Injectable } from '@angular/core';
import { ProductImageApiService } from './product-image-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductImageService {

constructor(
  private apiService: ProductImageApiService
) { }
getAllProductImage() {
  return this.apiService.getAllProductImage();
}

getProductImage(id: number) {
  return this.apiService.getProductImage(id);
}
createCustomer(data: any) {
  return this.apiService.createProductImage(data);
}
}
