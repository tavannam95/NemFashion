import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constant} from "../../../../../shared/constants/Constant";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatButton} from "@angular/material/button";
export interface UserData {
  STT: string;
  employee: string;
  customer: string;
  address: string;
  total: string;
  status: string;
}
@Component({
  selector: 'order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  constructor(private readonly dialogRef: MatDialogRef<OrderDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    const users = Array.from({length: 10}, (_, k) => createNewUser(k + 1));
    this.dataSource = new MatTableDataSource(users);

  }
  abc:any
  ngOnInit(): void {
  }

  dataSource: MatTableDataSource<any>;

  onDismiss() {
    this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.CLOSE);
  }

  displayedColumns: string[] = ['STT', 'employee', 'customer', 'address', 'status', 'total','status'];

  save() {

  }
}
  function createNewUser(id: number): UserData {
    return {
      STT:'SP001',employee:'Bánh mì bíc ci đặc ruột thơm ngon', customer:'2', address:'5000', status:'0', total:'10000'
    };
  }


