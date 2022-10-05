import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

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

export class ProductListComponent implements OnInit {
  constructor() { 
  }
  ngOnInit(): void {
  }
  
}

