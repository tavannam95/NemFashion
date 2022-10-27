import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../shared/service/product-service/product.service";
import {ProductViewComponent} from "../home/product-view/product-view.component";
import {MatDialog} from "@angular/material/dialog";
import {SizeService} from "../../../shared/service/size-service/size.service";
import {CategoryService} from "../../../shared/service/category-service/category.service";
import {ColorService} from "../../../shared/service/color-service/color.service";
import {FormBuilder, Validators} from "@angular/forms";
import {checkPrice} from "../../../shared/validators/checkPrice";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  listPro: any;
  listSize: any;
  litsCate: any;
  listColor: any ;
  listPros: any ;

  listProBySize = [];
  listProByCate = [];
  listProByColor = [];

  defaultValueSize = [];
  defaultValueCategory = [];
  defaultValueColor = [];

  totalPage: any ;
  listPage = [] ;
  pagaNo = 0 ;
  checkPage = 0 ;
  pageSize = 8 ;
  sortPrice = 0 ;
  check = true ;

  formPrice = this.fb.group( {
      max: ['' ] ,
      min: ['' ]
  }, {
      validators: checkPrice
  })

  constructor(private fb:FormBuilder ,
              private proService: ProductService,
              private sizeService: SizeService,
              private dialog: MatDialog,
              private cateService: CategoryService ,
              private colorService: ColorService ) {
    this.getAllSize();
    // this.getAllPro();
    this.getAllCategory();
    this.getAllColor() ;
  }

  getAllPro() {
    this.proService.getAllProduct().subscribe(data => {
      this.listPro = data
    })
  }

  getAllCategory() {
    this.cateService.getAllCategory().subscribe(data => {
      this.litsCate = data
      this.changeValue(data, this.defaultValueCategory);
      console.log('cate')
      console.log(this.defaultValueCategory)
    })
  }

  getAllSize() {
    this.sizeService.getAllSize().subscribe(data => {
      this.listSize = data;
      this.changeValue(data, this.defaultValueSize);
      console.log(this.defaultValueSize)
    })
  }

  getAllColor(){
     this.colorService.getAllByColor().subscribe( data => {
         this.listColor = data ;
         this.changeValue( data , this.defaultValueColor )
       console.log( this.defaultValueColor)
         this.findAll() ;
     })
  }

  changeValue(a: any, b: any) {
    for (var aa of a) {
      b.push(aa.id)
    }
  }

  getAllProByAllProperty(size: any, cate: any , color: any , max: number , min: number , pageNo: number , pageSize: number , sortPrice: number) {
    this.proService.getAllProByAllProperty(size, cate , color , max , min , pageNo , pageSize , sortPrice ).subscribe(data => {
      console.log(data)
      this.listPros = data ;
      this.listPro = this.listPros.content ;
      this.totalPage = this.listPros.totalPages ;
      this.changPage( this.totalPage , this.listPage  )
    })
  }

  ngOnInit(): void {

  }

  OpenProductView(product: any) {
    const dialogRef = this.dialog.open(ProductViewComponent, {
      width: '100vw',
      disableClose: true,
      hasBackdrop: true,
      data: {
        product: product,
        type: 'pro'
      }
    })

    dialogRef.afterClosed().subscribe(value => {

    })
  }

  //Tìm theo Size
  getAllBySize(size: number) {
    // @ts-ignore
    if (this.listProBySize.includes(size)) {
      // @ts-ignore
      this.listProBySize.splice(this.listProBySize.indexOf(size), 1)
    } else {
      // @ts-ignore
      this.listProBySize.push(size)
    }
    this.findAll()
  }
  // tìm theo category
  getAllByCategory(cate: number) {
    // @ts-ignore
    if (this.listProByCate.includes(cate)) {
      // @ts-ignore
      this.listProByCate.splice(this.listProByCate.indexOf(cate), 1)
    } else {
      // @ts-ignore
      this.listProByCate.push(cate)
    }

    console.log(this.listProByCate)
    this.findAll()
  }
  //Tìm theo color
  getAllByColor( color: number ) {
    // @ts-ignore
    if (this.listProByColor.includes(color)) {
      // @ts-ignore
      this.listProByColor.splice(this.listProByColor.indexOf(color), 1)
    } else {
      // @ts-ignore
      this.listProByColor.push(color)
    }
    console.log(this.listProByColor )
    this.findAll()
  }

  getAllByPrice(){
     this.formPrice.markAllAsTouched() ;
     if( this.formPrice.invalid ){
       return  ;
     }



     this.check = false ;
     this.findAll()
  }

  // Tìm kiếm theo các trường
  findAll() {
    var size: any;
    var cate: any;
    var color: any ;

    if( this.check ){
       this.formPrice.reset()
    }

    if (this.listProBySize.length == 0) {
      size = this.defaultValueSize
    } else {
      size = this.listProBySize;
    }

    if (this.listProByCate.length == 0) {
      cate = this.defaultValueCategory;
    } else {
      cate = this.listProByCate
    }

    if( this.listProByColor.length == 0 ){
      color = this.defaultValueColor ;
    }else{
      color = this.listProByColor
    }

    var max = Number( this.formPrice.value.max  ) ;
    var min = Number( this.formPrice.value.min ) ;
    this.listPage= []
    this.getAllProByAllProperty(size, cate , color , max , min , this.pagaNo , this.pageSize , this.sortPrice  ) ;
  }


//  phân trang
  changPage( page: number , a: any ){
     for( var i=0 ; i<page ; i++ ){
        a.push(i)
     }
  }

  nextPage( a: number){
     this.pagaNo = a ;
     this.checkPage = a ;
     this.findAll() ;
  }

  showProInPage(){
     this.pagaNo = 0
     this.checkPage = 0 ;
      console.log(this.pageSize)
     this.findAll()
  }

  showProSort(){
     this.pagaNo = 0 ;
     this.checkPage = 0 ;
     this.findAll() ;
  }

}
