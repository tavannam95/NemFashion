import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';
import {CustomerFormComponent} from '../customer-form/customer-form.component';
import {ConfirmDialogComponent} from '../../../../shared/confirm-dialog/confirm-dialog.component';

export interface UserData {
    id: string;
    fullName: string;
    photo: string;
    email: string;
    phone: string;
    birthDate: Date;
    siginDate: Date;
    status: number;
}

/** Constants used to fill up our data base. */
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
    selector: 'app-customer-list',
    templateUrl: './customer-list.component.html',
    styleUrls: ['./customer-list.component.scss']
})

export class CustomerListComponent implements OnInit, AfterViewInit {

    // displayedColumns
    displayedColumns: string[] = ['no', 'fullName', 'photo', 'email', 'phone', 'birthDate', 'siginDate', 'status', 'action'];
    dataSource: MatTableDataSource<UserData>;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    TYPE_DIALOG = Constant.TYPE_DIALOG;

    constructor(private readonly matDialog: MatDialog) {
        // Create 100 users
        const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
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

    ngOnInit(): void {
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
}

function createNewUser(id: number): UserData {
    const name =
        NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
        ' ' +
        NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
        '.';

    return {
        id: id.toString(),
        fullName: name,
        photo: 'https://res.cloudinary.com/nemfashion/image/upload/v1664380965/plmq7131t2wuwb7eekva.png',
        email: 'phuong@gmail.com',
        phone: '1234567',
        birthDate: new Date(),
        siginDate: new Date(),
        status: 1
    };
}
