import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstrant} from "../../constants/ApiConstrants.module";

@Injectable({
  providedIn: 'root'
})
export class OrderDetailApiService {

  constructor(private readonly http: HttpClient) {
  }

  createOrderDetail(data: any) {
    return this.http.post(`${ApiConstrant.orderDetail}`, data);
  }

}
