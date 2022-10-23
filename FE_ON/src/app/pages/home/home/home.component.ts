import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../shared/service/product-service/product.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listPro: any ;

  constructor( private proService: ProductService ) {
    proService.getAllProduct().subscribe( data => {
      this.listPro = data
      console.log( this.listPro )
    })
  }

  ngOnInit(): void {
  }

  slideConfig = { slidesToShow: 4, slidesToScroll:1 , styles: 'fontsize: 30px' };

  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }

}
