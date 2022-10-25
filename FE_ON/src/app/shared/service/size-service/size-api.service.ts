import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstrant} from "../../constants/ApiConstrants.module";

@Injectable({
  providedIn: 'root'
})
export class SizeApiService {

  constructor(private readonly http: HttpClient) { }


  findAllSizeInProductDetails(productId: number){
    return this.http.get(`${ApiConstrant.size}/productId/${productId}`);
  }

}
