import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstrant} from "../../constants/ApiConstrants.module";

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private readonly http: HttpClient) {
  }

  createOrder(data: any) {
    return this.http.post(`${ApiConstrant.order}`, data);
  }

}
