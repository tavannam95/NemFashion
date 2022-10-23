import { Injectable } from '@angular/core';
import {SellingApiService} from "./selling-api.service";

@Injectable({
  providedIn: 'root'
})
export class SellingService {

  constructor(private sellingApiService: SellingApiService) { }

  getAllCategories(){
    return this.sellingApiService.getAllCategories();
  }

  getProByCate(id: any){
    return this.sellingApiService.getProByCate(id);
  }

  getProductDetail(id: any){
    return this.sellingApiService.getProductDetail(id);
  }
}
