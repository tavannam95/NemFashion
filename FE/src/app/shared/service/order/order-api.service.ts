import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

constructor(private readonly http: HttpClient) { }

getAllOrder(): Observable<any>{
  return this.http.get(ApiConstant.order);
}

verifyOrder(id: number, data: any){
  return this.http.put(`${ApiConstant.order}/verify/${id}`,data);
}

}
