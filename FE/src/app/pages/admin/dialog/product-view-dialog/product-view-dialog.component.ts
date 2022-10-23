import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ProductDetailService } from '../../../../shared/service/productDetail/product-detail.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductViewImagesDialogComponent } from './product-view-images-dialog/product-view-images-dialog.component';

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
    private dialog: MatDialog
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
    console.log(map);
    
    map.forEach((value,key) => {
      this.color = {};
      this.color.code = key;
      this.color.size = this.productDetails.filter(
        s =>s.color.code == key
      ).map(s => {return s.size.code});
      this.colors.push(this.color);
    });
  }

  openProductViewImagesDialog(){
    this.dialog.open(ProductViewImagesDialogComponent,{
      height: '600px',
      width: '1000px',
      data: this.product.id,
    })
  }

  getProductDetailById(){
    return this.poductDetailService.getProductDetailById(this.product.id).subscribe({
      next: (res) =>{

        this.dataSource = new MatTableDataSource<any>(res);
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.productDetails = res;
          console.log(this.productDetails);
          
          this.getSizeByColor();
        
      },
      error: (err) =>{
        console.log(err);
        this.toastrService.error('Không tải được chi tiết sản phẩm')
      }
    })
  }

}
