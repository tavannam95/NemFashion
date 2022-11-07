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

findByStatus(status: any): Observable<any>{
  return this.http.get(`${ApiConstant.order}/${status}`);
}

verifyOrCancelOrder(data: any, status: number){
  return this.http.put(`${ApiConstant.order}/updateStatus/${status}`,data);
}

}
