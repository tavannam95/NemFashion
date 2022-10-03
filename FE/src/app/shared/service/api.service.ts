import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Constant} from '../constants/Constant';
import {ApiConstant} from '../constants/ApiConstant';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private readonly http: HttpClient) {
    }

    // Customer
    getAllCustomer(): Observable<any> {
        return this.http.get(ApiConstant.customer);
    }

    getCustomer(id: number): Observable<any> {
        return this.http.get(`${ApiConstant.customer}/${id}`);
    }

    createCustomer(data: any): Observable<any> {
        return this.http.post(ApiConstant.customer, data);
    }

    updateCustomer(data: any, id: number): Observable<any> {
        return this.http.put(`${ApiConstant.customer}/${id}`, data);
    }

    deleteCustomer(id: number): Observable<any> {
        return this.http.delete(`${ApiConstant.customer}/${id}`);
    }

    //End customer
}
