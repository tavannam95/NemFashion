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

}
