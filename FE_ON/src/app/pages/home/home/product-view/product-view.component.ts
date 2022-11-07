import {Component, Inject, OnInit} from '@angular/core';
import {ProductService} from "../../../../shared/service/product-service/product.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HomeComponent} from "../home.component";
import {Constants} from "../../../../shared/constants/constants.module";
import {SizeService} from "../../../../shared/service/size-service/size.service";
import {ColorService} from "../../../../shared/service/color-service/color.service";
import {ProductDetailService} from "../../../../shared/service/product-detail-service/product-detail.service";

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
  listColor: any ;
  listSize: any ;
  listProDetail: any ;

  idColor = -1 ;
  idSize = -1 ;
  tt = true ;

  listColorCheck = [] ;
  listSizeCheck = [] ;

  constructor(private proService: ProductService ,
              private sizeService: SizeService ,
              private colorService: ColorService ,
              private proDetailService: ProductDetailService ,
              @Inject(MAT_DIALOG_DATA) public data: any ,
              public dialogRef: MatDialogRef<HomeComponent> ) {
  }

  ngOnInit(): void {
    this.product = this.data.product ;
    this.thumnail = this.product.thumnail ;
    this.getAllColor(this.product.id) ;
    this.getAllProImage(this.product.id) ;
    this.getAllSize(this.product.id) ;
    this.getAllProDetail( this.product.id ) ;
  }

  clickColor( id: number ){
      // this.tt = false ;
      // if( this.idSize == -1 ){
        this.listColorCheck = [] ;
        this.idColor = id ;
        for( let x of this.listProDetail ){
          if( x.color.id == id ){
            // @ts-ignore
            this.listColorCheck.push(x);
          }
        // }
      }
  }

  clickSize( id: number ){
    // if( this.idColor == -1 ){
      this.listSizeCheck = []
      // this.tt = true ;
      this.idSize = id ;
      for( let x of this.listProDetail ){
        if( x.size.id == id ){
          // @ts-ignore
          this.listSizeCheck.push(x) ;
        // }
      }
    }
  }

  checkColor(id: number){
      if( this.idColor != -1  ){
        for( let x of this.listColorCheck ){
            // @ts-ignore
          if(x.size.id == id &&  x.quantity == 0 ){
                  return true ;
              }
          }
        return this.babla(id , 'size') ;
      }
     return false ;
  }

  checkSize( id: number ){
    if( this.idSize != -1  ){
      for( let x of this.listSizeCheck ){
        // @ts-ignore
        if(x.color.id == id &&  x.quantity == 0 ){
          return true ;
        }
      }
      return this.babla(id , 'color') ;
    }
    return false ;
  }

  babla( id:number , type: string){
     if( type == 'size' ){
       for( let x of this.listColorCheck ){
         // @ts-ignore
         if( x.size.id == id ){
           return false ;
         }
       }
     }else{
        for( let x of this.listSizeCheck ){
           // @ts-ignore
          if( x.color.id == id ){
              return false ;
           }
        }
     }
     return true ;
  }

  getAllProDetail( id: number ){
      this.proDetailService.getProductDetailByProductId( id ).subscribe( data =>{
          this.listProDetail = data ;
        console.log(data)
      })
  }

  getAllProImage( id: number ){
    this.proService.getProductImageById(id).subscribe( value =>  {
      this.productImage = value ;
    })
  }

  getAllSize( id: number) {
     this.sizeService.findAllSizeInProductDetails(id).subscribe( data => {
          this.listSize = data ;
       console.log(data)
     })
  }

  getAllColor( id: number ){
     this.colorService.findAllColorInProductDetails(id).subscribe( data => {
          this.listColor = data ;
     })
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
    this.thumnail = img ;
  }

  onCancel( ){
    this.dialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE) ;
  }



}
