import { Injectable } from '@angular/core';
import {RatingImageApiService} from "./rating-image-api.service";

@Injectable({
  providedIn: 'root'
})
export class RatingImageService {


  constructor( private ratingImgService: RatingImageApiService ) { }

  creatRatingImg( rateImg: any ){
     return this.ratingImgService.createRatingImage(rateImg) ;
  }
}
