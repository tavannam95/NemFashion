import { Injectable } from '@angular/core';
import {SizeApiService} from "./size-api.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SizeService {
  constructor( private sizeApi: SizeApiService ) { }

  getAllSize() {
     return this.sizeApi.getAll() ;
  }
}
