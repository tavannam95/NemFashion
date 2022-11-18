import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductDetailService } from '../../../../shared/service/productDetail/product-detail.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductViewImagesDialogComponent } from './product-view-images-dialog/product-view-images-dialog.component';
import printJS from "print-js";
import {ProductService} from "../../../../shared/service/product/product.service";

@Component({
  selector: 'app-product-view-dialog',
  templateUrl: './product-view-dialog.component.html',
  styleUrls: ['./product-view-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductViewDialogComponent implements OnInit {

  displayedColumns: string[] = ['id', 'color', 'size', 'quantity'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  product: any;
  
  productDetails: any;
  sizes: any;
  colors: any;
  color: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private poductDetailService: ProductDetailService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.product = this.dataDialog;
    this.getProductDetailById();
  }

  getSizeByColor(){
    this.colors = [];
    let map = new Map();
    this.productDetails.forEach(res => {
      map.set(res.color.code,res.color.name);
    });
    
    map.forEach((value,key) => {
      this.color = {};
      this.color.code = key;
      this.color.size = this.productDetails.filter(
        s =>s.color.code == key
      ).map(s => {return s.size.code});
      this.colors.push(this.color);
    });
  }


  getProductDetailById(){
    return this.poductDetailService.getProductDetailById(this.product.id).subscribe({
      next: (res) =>{

        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.productDetails = res;
          
          this.getSizeByColor();
        
      },
      error: (err) =>{
        console.log(err);
        this.toastrService.error('Không tải được chi tiết sản phẩm')
      }
    })
  }

  printQR(){
    let id = 36; // Cái này a truyền nó nó là id của detail
    this.productService.generateBarcode(id).subscribe(
        {
          next: resp => {
            console.log(resp);
            printJS({printable: [resp.message,resp.message],type: 'image',imageStyle: 'width:100%;margin-bottom:20px;'})
          }
        }
    )

  }

}
