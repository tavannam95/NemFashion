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

createSize(data: any){
  return this.http.post(ApiConstant.color,data);
}

}
