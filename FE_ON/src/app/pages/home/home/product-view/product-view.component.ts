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
  }

  changThumnail( img: string ) {
    this.thumnail = img ;
  }

  onCancel( ){
    this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE) ;
  }

}
