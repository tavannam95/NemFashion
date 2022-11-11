import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ghn } from '../../constants/Ghn';
import { ApiConstant } from '../../constants/ApiConstant';
import axios from 'axios';
import { Constant } from '../../constants/Constant';

@Injectable({
  providedIn: 'root'
})
export class GhnApiService {

  constructor(
      private http: HttpClient,
    
    ) { }

  createOrderGhn(data: any){
    return this.http.post(`${ApiConstant.ghn}/create`,data);
  }
}
