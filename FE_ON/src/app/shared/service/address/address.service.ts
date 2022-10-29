import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConstrant} from "../../constants/ApiConstrants.module";

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private readonly http: HttpClient) {
  }

  getCity() {
    return this.http.get('https://provinces.open-api.vn/api/p/');
  }

  getDistrict(code: any) {
    return this.http.get('https://provinces.open-api.vn/api/p/' + code + '?depth=2');
  }

  getWard(code: any) {
    return this.http.get('https://provinces.open-api.vn/api/d/' + code + '?depth=2');
  }

  findAddressByCustomerId(customerId: any) {
    return this.http.get(`${ApiConstrant.address}/${customerId}`);
  }

  findAddressById(id: any) {
    return this.http.get(`${ApiConstrant.address}/address/${id}`);
  }

  createAddress(data: any) {
    return this.http.post(`${ApiConstrant.address}`, data);
  }

  updateAddress(id: number, data: any) {
    return this.http.put(`${ApiConstrant.address}/${id}`, data);
  }

  deleteAddress(id: number) {
    return this.http.delete(`${ApiConstrant.address}/${id}`);
  }

  findAddressByStatus(customerId: number){
    return this.http.get(`${ApiConstrant.address}/status/${customerId}`);
  }
}
