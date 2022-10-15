import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../../../../shared/service/product/product.service';
import { analytics } from 'googleapis/build/src/apis/analytics';

export interface Product{
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  thumnail: string;
  createDate: Date;
  updateDate: Date;
  status: boolean
}

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
              private productService: ProductService) { 
  }
  ngOnInit(): void {
    this.getAllProduct();
  }
  editProduct(any: any){

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

  createProduct(){
    this.productService.createProduct({
      name: "Test03",
      price: 100.0,
      description: "Không có mô tả",
      thumnail: "aodai.jpg",
      createDate: "2021-12-31T17:00:00.000+00:00",
      updateDate: "2021-12-31T17:00:00.000+00:00",
      status: 1,
      category: {
        id: 1
      }
    }).subscribe({
      next: (res)=>{
        console.log(res);
      },
      error: (err)=>{
        console.log(err)
      }
    });

  }

  checkData(){
    console.log(this.dataSource)
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }
}

