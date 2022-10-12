import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProductApiService } from './product-api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private readonly apiService: ProductApiService,
            private readonly toastService: ToastrService) { }
getAllProduct() {
  return this.apiService.getAllProduct();
}
createProduct(data: any){
  return this.apiService.createProduct(data);
}
}
