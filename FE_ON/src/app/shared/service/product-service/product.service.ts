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

  getAllProBySize( sizes : any ){
     var path = ''
     for( var x of sizes ){
        path += 'size=' + x + '&'
     }
    path = path.slice( 0 , path.length - 1 )
    console.log(path)

     return this.proApi.getProBySize(path) ;
  }

}
