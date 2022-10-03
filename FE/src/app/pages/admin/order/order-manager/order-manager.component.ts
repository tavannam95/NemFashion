import { Component, OnInit } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {ConfirmDialogComponent} from "../../../../shared/confirm-dialog/confirm-dialog.component";
import {Constant} from "../../../../shared/constants/Constant";

export interface UserData {
  id: string;
  employeee: string;
  customerr: string;
  address: string;
  total: string;
  discount: string;
  pay: string;
  statuss: string;
}
const FRUITS: string[] = [
  'blueberry',
  'lychee',
  'kiwi',
  'mango',
  'peach',
  'lime',
  'pomegranate',
  'pineapple',
];
const NAMES: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
  'Theodore',
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
  selector: 'order-manager',
  templateUrl: './order-manager.component.html',
  styleUrls: ['./order-manager.component.scss']
})
export class OrderManagerComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  TYPE_DIALOG = Constant.TYPE_DIALOG;
  constructor(private matDialog: MatDialog) {
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }


  ngOnInit(): void {
    // this.formSearch = this.fb.group({
    //     statusOrder: [1, 2, 3, 4 , 5],
    //
    //     }
    // )
  }

  displayedColumns: string[] = ['id', 'employee', 'customer', 'address', 'status', 'total', 'discount', 'pay', 'action'];
  dataSource: MatTableDataSource<UserData>;

  openFormDialog(type: string, row?: any) {
    this.matDialog.open(OrderDetailComponent, {
      width: '1000px',
      disableClose: false,
      hasBackdrop: true,
      data: {
        type,
        row
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        // Get all
      }
    })
  }

  onDelete() {
    this.matDialog.open(ConfirmDialogComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {
        message: 'Bạn có muốn xóa bản ghi này?'
      }
    }).afterClosed().subscribe(result => {
      if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
        // Delete
      }
    })
  }

  ngAfterViewInit() {
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
function createNewUser(id: number): UserData {
  const name =
      NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
      ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
      '.';

  return {
    id: id.toString(),
    employeee: name,
    customerr: name ,
    address:   name,
    total: Math.round(Math.random() * 100).toString(),
    discount: Math.round(Math.random() * 100).toString(),
    pay: (Math.round(Math.random() * 100) - Math.round(Math.random() * 100)).toString(),
    statuss:'1',
  };
}
