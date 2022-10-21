import {Injectable, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiConstrant} from "../../constants/ApiConstrants.module";

@Injectable({
  providedIn: 'root'
})

export class ProductApiService {
   constructor( private http: HttpClient ) {
   }

   getAll(): Observable<any> {
      return this.http.get( ApiConstrant.product ) ;
   }

   getById( id: number) : Observable<any> {
     return this.http.get( `${ApiConstrant.product}/${id}`)
   }

   create( pro: any) : Observable<any> {
      return this.http.post( ApiConstrant.product , pro) ;
   }

   update( pro: any ):Observable<any> {
     return this.http.put( `${ApiConstrant.product}/${pro.id}` , pro );
   }

}
