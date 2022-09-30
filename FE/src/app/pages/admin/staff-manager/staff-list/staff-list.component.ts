import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../shared/confirm-dialog/confirm-dialog.component';
import {Constant} from '../../../../shared/constants/Constant';
import {FormBuilder} from '@angular/forms';
import {StaffFormComponent} from '../staff-form/staff-form.component';

export interface PeriodicElement {
    fullname: string;
    email: string;
    password: string;
    birthday: string;
    phone: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    {fullname: 'kaka', email: 'Hydrogen', password: '558', birthday: 'H', phone: '0155'},
    {fullname: 'kaka', email: 'Helium', password: 'scas', birthday: 'He', phone: '0155'},
    {fullname: 'kaka', email: 'Lithium', password: 'scas', birthday: 'Li', phone: '0155'},
    {fullname: 'kaka', email: 'Beryllium', password: 'scas', birthday: 'Be', phone: '0155'},
    {fullname: 'kaka', email: 'Boron', password: 'scas', birthday: 'B', phone: '0155'},
    {fullname: 'kaka', email: 'Carbon', password: 'scas', birthday: 'C', phone: '0155'},
    {fullname: 'kaka', email: 'Nitrogen', password: 'scas', birthday: 'N', phone: '0155'},
    {fullname: 'kaka', email: 'Oxygen', password: 'scas', birthday: 'O', phone: '0155'},
    {fullname: 'kaka', email: 'Fluorine', password: 'scas', birthday: 'F', phone: '0155'},
    {fullname: 'kaka', email: 'Neon', password: 'scas', birthday: 'Ne', phone: '0155'},
    {fullname: 'kaka', email: 'Sodium', password: 'scas', birthday: 'Na', phone: '0155'},
    {fullname: 'kaka', email: 'Magnesium', password: 'scas', birthday: 'Mg', phone: '0155'},
    {fullname: 'kaka', email: 'Aluminum', password: 'scas', birthday: 'Al', phone: '0155'},
    {fullname: 'kaka', email: 'Silicon', password: 'scas', birthday: 'Si', phone: '0155'},
    {fullname: 'kaka', email: 'Phosphorus', password: 'scas', birthday: 'P', phone: '0155'},
    {fullname: 'kaka', email: 'Sulfur', password: 'scas', birthday: 'S', phone: '0155'},
    {fullname: 'kaka', email: 'Chlorine', password: 'scas', birthday: 'Cl', phone: '0155'},
    {fullname: 'kaka', email: 'Argon', password: 'scas', birthday: 'Ar', phone: '0155'},
    {fullname: 'kaka', email: 'Potassium', password: 'scas', birthday: 'K', phone: '0155'},
    {fullname: 'kaka', email: 'Calcium', password: 'scas', birthday: 'Ca', phone: '0155'},
];

@Component({
    selector: 'app-staff-list',
    templateUrl: './staff-list.component.html',
    styleUrls: ['./staff-list.component.scss']
})

export class StaffListComponent implements OnInit, AfterViewInit {
    TYPE_DIALOG = Constant.TYPE_DIALOG ;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = ['fullname', 'email', 'password', 'birthday', 'phone', 'sk', 'control'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);


    constructor(private dialog: MatDialog  ) {

    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    openDialogForm( type: string ) {
        const dialogRef = this.dialog.open( StaffFormComponent , {
            width: '60vw' ,
            disableClose: true ,
            hasBackdrop: true ,
            data: {
                type: type
            }
        })
    }

    openDialogDelete() {
        const dialogRef = this.dialog.open( ConfirmDialogComponent, {
            width: '25vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                message: 'Bạn có muốn xóa bản ghi này?'
            }
        })

        dialogRef.afterClosed().subscribe( rs => {
             // if ( rs === Constant.RESULT_CLOSE_DIALOG.CONFIRM ) {
             //
             // }
            console.log(rs)
        })
    }

}
