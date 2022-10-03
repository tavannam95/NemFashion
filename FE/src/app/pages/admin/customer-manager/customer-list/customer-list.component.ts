import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';
import {CustomerFormComponent} from '../customer-form/customer-form.component';
import {ConfirmDialogComponent} from '../../../../shared/confirm-dialog/confirm-dialog.component';
import {CustomerService} from '../../../../shared/service/customer.service';

@Component({
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit {

    displayedColumns: string[] = ['no', 'fullname', 'photo', 'email', 'phone', 'birthDate', 'siginDate', 'status', 'action'];
    dataSource: MatTableDataSource<any>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    TYPE_DIALOG = Constant.TYPE_DIALOG;

    customers: any[] = [];
    isLoading: boolean = false;

    constructor(private readonly matDialog: MatDialog,
                private readonly customerService: CustomerService) {
    }

    ngOnInit(): void {
        this.getAllCustomer();
    }

    getAllCustomer() {
        this.isLoading = true;
        return this.customerService.getAllCustomer().subscribe({
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

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    openFormDialog(type: string, row?: any) {
        this.matDialog.open(CustomerFormComponent, {
            width: '1000px',
            disableClose: true,
            hasBackdrop: true,
            data: {
                type,
                row
            }
        }).afterClosed().subscribe(result => {
            if (result === Constant.RESULT_CLOSE_DIALOG.SUCCESS) {
                this.getAllCustomer();
            }
        })
    }

    onDelete(id: number) {
        this.matDialog.open(ConfirmDialogComponent, {
            disableClose: true,
            hasBackdrop: true,
            data: {
                message: 'Bạn có muốn xóa bản ghi này?'
            }
        }).afterClosed().subscribe(result => {
            if (result === Constant.RESULT_CLOSE_DIALOG.CONFIRM) {
                this.customerService.deleteCustomer(id);
            }
            this.getAllCustomer();
        })
    }
}

