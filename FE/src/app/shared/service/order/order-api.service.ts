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

// getOneOrder(id: number){
//   return this.http.get(`${ApiConstant.order}/${id}`);
// }


// createOrder(data: any): Observable<any> {
//   return this.http.post(ApiConstant.order, data);
// }

// updateOrder(data: any, id: number): Observable<any> {
//   return this.http.put(`${ApiConstant.order}/${id}`, data);
// }

// deleteOrder(data: any, id: number): Observable<any> {
//   return this.http.put(`${ApiConstant.order}/${id}`, data);
// }

// getOrderView(data: any){
//   return this.http.post(`${ApiConstant.order}/view`,data);
// }

}
