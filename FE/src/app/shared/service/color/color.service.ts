import { Injectable } from '@angular/core';
import { ColorApiService } from './color-api.service';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

constructor(
  private readonly apiService: ColorApiService
) { }
createColor(data: any){
  return this.apiService.createSize(data);
}
}
