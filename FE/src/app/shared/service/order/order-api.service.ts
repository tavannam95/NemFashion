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

verifyOrCancelOrder(id: number, data: any, f: number){
  return this.http.put(`${ApiConstant.order}/verifyOrCancel/${id}/${f}`,data);
}

}
