import { Injectable } from '@angular/core';
import {ProductApiService} from "./product-api.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private proApi: ProductApiService  ) {
  }

  getAllProduct( ) {
     return this.proApi.getAll() ;
  }

  getProductById( id: number ){
    return this.proApi.getById( id );
  }

  // Product Imgae
  getProductImageById( id: number ){
    return this.proApi.getProductImage( id );
  }

}
