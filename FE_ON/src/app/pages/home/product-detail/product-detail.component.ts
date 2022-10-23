import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../shared/service/product-service/product.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: any ;
  productImage: any ;
  thumnail = '' ;

  constructor( private route: ActivatedRoute ,
               private ServicePro: ProductService ) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap ;
    const productIdFromRoute = Number(routeParams.get('id')) ;
    this.ServicePro.getProductById( productIdFromRoute ).subscribe( value => {
      this.thumnail = value.thumnail ;
       this.product = value ;
       this.ServicePro.getProductImageById( value.id ).subscribe( value => {
           this.productImage = value ;
       })
    })
  }

  changThumnail( img: string ) {
     this.thumnail = img ;
  }

}
