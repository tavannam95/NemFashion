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

  getById( id: number ){
    return this.proApi.getById( id );
  }

}
