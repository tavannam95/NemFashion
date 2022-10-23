import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../shared/service/product-service/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  listPro : any ;

  constructor(  private proService: ProductService ) {
     this.proService.getAllProduct().subscribe( data => {
         this.listPro = data
     })
  }

  ngOnInit(): void {

  }

}
