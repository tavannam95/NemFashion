import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';
import {FormBuilder, Validators} from '@angular/forms';
import {StaffListComponent} from '../staff-list/staff-list.component';

@Component({
    selector: 'app-staff-form',
    templateUrl: './staff-form.component.html',
    styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {
    TYPE_DIALOG = Constant.TYPE_DIALOG ;
    title = '' ;

    staff = this.fb.group( {
        id: null ,
        fullname: ['' , Validators.required ],
        email: ['' , [Validators.required , Validators.pattern("^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$")]] ,
        password: ['' , [Validators.required ]] ,
        birthday: ['' , [Validators.required ]] ,
        phone: ['' , [Validators.required , Validators.pattern("0[3,9]\\d{8}")]] ,
        address: ['' , [Validators.required ]] ,
        role: 1
    })

    constructor(private fb: FormBuilder ,
                @Inject(MAT_DIALOG_DATA) public dataDialog?: any ,
                private dialogRef?: MatDialogRef<StaffListComponent>
                ) {

    }

    ngOnInit(): void {
        if ( this.dataDialog.type === this.TYPE_DIALOG.NEW ) {
            this.title = 'Thêm mới nhân viên'
        }else{
            this.staff.patchValue( this.dataDialog.row )
        }
    }

    onDismiss() {
        this.dialogRef.close( Constant.RESULT_CLOSE_DIALOG.CLOSE ) ;
    }

    isValidator( name: string , error: string ){
        return this.staff.get(name).hasError(error) && this.staff.get(name).touched ;
    }

}
