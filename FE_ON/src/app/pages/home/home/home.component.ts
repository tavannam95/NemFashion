import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../../shared/service/product-service/product.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductViewComponent} from "./product-view/product-view.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listPro: any ;

  constructor( private proService: ProductService ,
               private dialog: MatDialog ) {
    proService.getAllProduct().subscribe( data => {
      this.listPro = data
      console.log( this.listPro )
    })
  }

  ngOnInit(): void {
  }

  slideConfig = { slidesToShow: 4, slidesToScroll:1 , swipeToSlide: true};

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

  OpenProductView( product: any ){
     const dialogRef = this.dialog.open( ProductViewComponent , {
       width: '100vw' ,
       disableClose: true ,
       hasBackdrop: true ,
       data: {
           product: product ,
           type: 'home'
       }
     })

    dialogRef.afterClosed().subscribe( value => {

    })
  }

}
