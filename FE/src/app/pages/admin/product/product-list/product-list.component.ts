import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';

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

export class ProductListComponent implements AfterViewInit  {
  
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'thumnail', 'status', 'function'];
  dataSource: MatTableDataSource<Product>;

  // Fake Product
  products: Product[] = [
    {
      id: '1',
      name: 'Áo sơ mi ni ki',
      category: 'Áo',
      price: 1000,
      description: 'desciption1',
      thumnail: 'thumnail1',
      createDate: new Date(),
      updateDate: new Date(),
      status: Math.random() < 0.5
    },
    {
      id: '2',
      name: 'Quần sơ mi',
      category: 'Quần',
      price: 1000,
      description: 'desciption2',
      thumnail: 'thumnail2',
      createDate: new Date(),
      updateDate: new Date(),
      status: Math.random() < 0.5
    },
    {
      id: '3',
      name: 'Áo sơ mi',
      category: 'Áo',
      price: 1000,
      description: 'desciption3',
      thumnail: 'thumnail3',
      createDate: new Date(),
      updateDate: new Date(),
      status: Math.random() < 0.5
    },
    {
      id: '4',
      name: 'Váy sơ mi',
      category: 'Váy',
      price: 1000,
      description: 'desciption4',
      thumnail: 'thumnail4',
      createDate: new Date(),
      updateDate: new Date(),
      status: Math.random() < 0.5
    },
    {
      id: '5',
      name: 'Áo khoác sơ mi',
      category: 'Áo',
      price: 1000,
      description: 'desciption5',
      thumnail: 'thumnail5',
      createDate: new Date(),
      updateDate: new Date(),
      status: Math.random() < 0.5
    },
    {
      id: '6',
      name: 'Quần mi',
      category: 'Quần',
      price: 1000,
      description: 'desciption6',
      thumnail: 'thumnail6',
      createDate: new Date(),
      updateDate: new Date(),
      status: Math.random() < 0.5
    },
    
  ]

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private formBuilder: FormBuilder) { 
    this.dataSource = new MatTableDataSource(this.products);
  }
  
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  
  }
}

