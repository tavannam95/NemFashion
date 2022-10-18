import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConstant } from '../../constants/ApiConstant';

@Injectable({
  providedIn: 'root'
})
export class ColorApiService {

constructor(
  private readonly http: HttpClient
) { }

createColor(data: any){
  return this.http.post(ApiConstant.color,data);
}

getAllColor(){
  return this.http.get(ApiConstant.color);
}

}
