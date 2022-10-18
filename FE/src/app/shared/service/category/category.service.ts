import { Injectable } from '@angular/core';
import { CategoryApiService } from './category-api.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

constructor(
  private readonly categoryApiService: CategoryApiService
) { }

getAllCategory(){
  return this.categoryApiService.getAllCategory();
}
createCategory(data: any){
  return this.categoryApiService.createCategory(data);
}
}
