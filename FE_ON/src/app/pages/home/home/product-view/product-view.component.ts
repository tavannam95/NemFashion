import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../../../../shared/service/product-service/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HomeComponent} from "../home.component";
import {Constants} from "../../../../shared/constants/constants.module";

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {
  title = 'sssssss'
  product: any ;
  productImage: any ;
  thumnail = '' ;

  constructor(private proService: ProductService ,
              @Inject(MAT_DIALOG_DATA) public data: any ,
              public dialogRef: MatDialogRef<HomeComponent> ) {
  }

  ngOnInit(): void {
    this.product = this.data.product ;
    this.thumnail = this.product.thumnail ;
    this.proService.getProductImageById( this.product.id ).subscribe( value =>  {
         this.productImage = value ;
    })
    console.log(this.data.type)
    //    this.proService.getAllProduct().subscribe( data => {
    //      this.productImage = data ;
    //    }
    // )
  }

  slideConfissg = { slidesToShow: 3, slidesToScroll:1  , vertical: true ,draggable: false , infinite: false ,
    nextArrow: ' <button type="button" style="z-index: 3" class="text-white btn btn-dark opacity-50 position-absolute bottom-0 start-50 translate-middle-x"><i class="fas fa-arrow-down"></i></button>' ,
    prevArrow: '<button type="button" style="z-index: 3" class="text-white btn btn-dark opacity-50 position-absolute top-0 start-50 translate-middle-x"><i class="fas fa-arrow-up  "></i></button>'};

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

  changThumnail( img: string ) {
    console.log(this.thumnail)
    console.log(img)
    console.log(this.thumnail == img )
    this.thumnail = img ;
  }

  onCancel( ){
    this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE) ;
  }

}
