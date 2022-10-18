import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../../../../shared/service/product/product.service';
import { ProductEditDialogComponent } from '../../dialog/product-edit-dialog/product-edit-dialog.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements OnInit  {
  
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'thumnail', 'status', 'function'];
  dataSource: MatTableDataSource<any>;

  isLoading: boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private dialog: MatDialog,
              private toastrService: ToastrService
              ) { 
  }
  ngOnInit(): void {
    this.getAllProduct();
  }
  
  getAllProduct(){
    this.isLoading = true;
    return this.productService.getAllProduct().subscribe({
      next: (res) => {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource<any>(res);
          
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
      },
      error: (err) => {
          this.isLoading = false;
          console.log(err)
      }
  })
  }


  checkData(){
    
  }

  openDialogProductEdit(data: any){
    this.dialog.open(ProductEditDialogComponent,{
      data: data,
      width: '1000px',
      disableClose: true
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }
}

