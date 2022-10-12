import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConstant } from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

constructor(private readonly http: HttpClient) { }

getAllProduct(): Observable<any>{
  return this.http.get(ApiConstant.product);
}

getProduct(id: number){
  return this.http.get(`${ApiConstant.product}/${id}`);
}


createProduct(data: any): Observable<any> {
  return this.http.post(ApiConstant.product, data);
}

updateProduct(data: any, id: number): Observable<any> {
  return this.http.put(`${ApiConstant.product}/${id}`, data);
}

deleteProduct(data: any, id: number): Observable<any> {
  return this.http.put(`${ApiConstant.product}/${id}`, data);
}

}
