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
/** Constants used to fill up our data base. */
const CATEGORYS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const DESCRIPTION: string[] = [
  'DESCRIPTION1',
  'DESCRIPTION2',
  'DESCRIPTION3',
  'DESCRIPTION4',
  'DESCRIPTION5',
  'DESCRIPTION6',
  'DESCRIPTION7',
  'DESCRIPTION8',
]
const THUMNAIL: string[] = [
  'ôn kết thúc',
  'hần mẫu',
  'thị đầu tiên',
  ' chúng tôi sẽ',
  'ai chỉ t',
  'ng dữ liệu c',
  ' thành ',
  'ỉ thị liên qu',
]
const NAMES: string[] = [
  
  'Isla',
  'Oliver',
  'Isabella',
  'Jasper',
  'Cora',
  'Levi',
  'Violet',
  'Arthur',
  'Mia',
  'Thomas',
  'Elizabeth',
];
@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})

export class ProductListComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'category', 'price', 'thumnail', 'status', 'function'];
  dataSource: MatTableDataSource<Product>;

  // editProduct(row: any){
  //   this.dialog.open(ProductFormComponent,{
  //     width: '700px',
  //     height: '580px',
  //     data: row
  //   })
  // }

  // openDialogAddProductDetail(row: any){
  //   this.dialog.open(ProductDetailFormComponent,{
  //     width: '700px',
  //     height: '550px',
  //     data: row
  //   })
  // }

  // openDialogCreate(): void{
  //   this.dialog.open(ProductFormComponent, {
  //     width: '700px',
  //     height: '550px'
  //   });
  // }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dialog: MatDialog) { 
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
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
/** Builds and returns a new User. */
function createNewUser(id: number): Product {
  const name =
    NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
    ' ' +
    NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
    '.';

  return {
    id: id.toString(),
    name: name,
    category: CATEGORYS[Math.round(Math.random() * (CATEGORYS.length - 1))],
    price: Math.round(Math.random() * 100),
    description: DESCRIPTION[Math.round(Math.random() * (DESCRIPTION.length - 1))],
    thumnail: THUMNAIL[Math.round(Math.random() * (THUMNAIL.length - 1))],
    createDate: new Date(),
    updateDate: new Date(),
    status: Math.random() < 0.5
  };
}
