import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../../constants/ApiConstant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {

  constructor(private readonly http: HttpClient) { }

  getAllOrder(): Observable<any>{
    return this.http.get(ApiConstant.order);
  }
}
