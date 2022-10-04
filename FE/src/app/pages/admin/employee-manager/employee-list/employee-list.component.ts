import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../../../../shared/confirm-dialog/confirm-dialog.component';
import {Constant} from '../../../../shared/constants/Constant';
import {FormBuilder} from '@angular/forms';
import {EmployeeFormComponent} from '../employee-form/employee-form.component';
import {EmployeeService} from '../../../../shared/service/employee/employee.service';
import {element} from 'protractor';

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
    selector: 'app-employee-list',
    templateUrl: './employee-list.component.html',
    styleUrls: ['./employee-list.component.scss']
})

export class EmployeeListComponent implements OnInit {
    TYPE_DIALOG = Constant.TYPE_DIALOG ;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    displayedColumns: string[] = [ 'photo' , 'fullname', 'email', 'password', 'birthday', 'phone' , 'address', 'role', 'status' ,'control'];
    dataSource = new MatTableDataSource();
    message = ''


    constructor(private dialog: MatDialog ,
                private emService: EmployeeService ) {
    }

    ngOnInit(): void {
        this.getAllData() ;
    }

    getAllData( ){
        this.emService.getAllEmployee().subscribe( value => {
            this.dataSource = new MatTableDataSource(value)
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
        })
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // ngAfterViewInit() {
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // }

    openDialogForm( type: string , row?:any) {
        const dialogRef = this.dialog.open( EmployeeFormComponent , {
            width: '60vw' ,
            disableClose: true ,
            hasBackdrop: true ,
            data: {
                type: type,
                row: row
            }
        })

        dialogRef.afterClosed().subscribe( value => {
            if( value === Constant.RESULT_CLOSE_DIALOG.SUCCESS ){
                this.getAllData() ;
            }
        })
    }

    openDialogDelete( status: number , row:any) {
        if( status == 2 ){
            this.message = 'Bạn muốn mở khóa nhân viên này không?'
        }else {
            this.message = 'Bạn muốn xóa nhân viên này không?'
        }
        const dialogRef = this.dialog.open( ConfirmDialogComponent, {
            width: '25vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                message: this.message
            }
        })

        dialogRef.afterClosed().subscribe( rs => {
             if ( rs === Constant.RESULT_CLOSE_DIALOG.CONFIRM ) {
                 if( status == 1 ){
                     row.status = 2 ;
                 }else{
                     row.status = 1 ;
                 }
                 this.emService.updateEmployee( row )
             }
            console.log(rs)
        })
    }

}
