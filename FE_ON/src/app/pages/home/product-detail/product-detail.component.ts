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

  constructor( private route: ActivatedRoute ,
               private ServicePro: ProductService ) {

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap ;
    const productIdFromRoute = Number(routeParams.get('id')) ;
    this.ServicePro.getById( productIdFromRoute ).subscribe( value => {
       this.product = value ;
    })
  }

}
