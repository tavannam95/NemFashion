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
    let header = new HttpHeaders();
    header.set('Token', Ghn.TOKEN);
    header.set('ShopId', Ghn.SHOP_ID);
    header.set('Content-Type', Ghn.CONTENT_TYPE);
    console.log(header);
    axios({
      method: 'POST',
      url: ApiConstant.ghn,
      data: data,
      headers: 
    })
    // return this.http.post(`${ApiConstant.ghn}/create`,{'header': header, 'data-raw': data});
  }
}
