import {Component, Inject, OnInit} from '@angular/core';
import {Constant} from '../../../../shared/constants/Constant';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {EmployeeService} from '../../../../shared/service/employee/employee.service';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {checkPassword, checkSpace, Regex} from '../../../../shared/validators/Regex';
import {EmployeeImageComponent} from '../employee-image/employee-image.component';


@Component({
    selector: 'employee-detail',
    templateUrl: './employee-detail.component.html',
    styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {
    title = 'Thông tin chi tiết'
    employee = this.fb.group( {
        id: null ,
        fullname: ['' , [ checkSpace , Validators.pattern( Regex.unicode ) ]],
        email: ['' , [Validators.required , Validators.email ]] ,
        password: ['' , [checkSpace ]] ,
        birthDate: ['' , [Validators.required ]] ,
        phone: ['' , [Validators.required , Validators.pattern("0[3,9]\\d{8}")]] ,
        address: ['' , [checkSpace ]] ,
        photo: '' ,
        status: 1 ,
        role: this.fb.group( {
            id: 1
        })
    })

    changePassword = this.fb.group( {
        oldPassword: ['' , checkSpace ],
        pw: this.fb.group( {
            newPassword: ['' , checkSpace ] ,
            confirmPassword: ['' , [checkSpace  ]]
        } ,{
            validators: checkPassword
        })
    })

    constructor( private fb: FormBuilder ,
                private employeeServive: EmployeeService,
                 private dialog: MatDialog ,
                 @Inject(MAT_DIALOG_DATA) public dataDialog?: any,
                private dialogRef?: MatDialogRef<EmployeeDetailComponent>) {
        this.getAllEmployee() ;
    }

    getAllEmployee(){
        this.employeeServive.getEmployeeById(3).subscribe(value => {
            this.employee.patchValue( value) ;
        });
    }

    onpenDialogUpdateImg( ){
        const dialogre = this.dialog.open( EmployeeImageComponent , {
            width:'40vw' ,
            disableClose: true,
            hasBackdrop: true,
        })

        dialogre.afterClosed().subscribe( value => {
            if( value === Constant.RESULT_CLOSE_DIALOG.SUCCESS ){
                this.getAllEmployee();
            }
        })
    }

    updateInformation() {
        this.employeeServive.updateEmployee( this.employee.getRawValue() ) ;
    }

    ngOnInit(): void {
    }

    onDismiss() {
        this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.CLOSE);
    }

    isValidator( name: string , error: string ){
        return this.changePassword.get(name).hasError(error) && this.changePassword.get(name).touched ;
    }

}
