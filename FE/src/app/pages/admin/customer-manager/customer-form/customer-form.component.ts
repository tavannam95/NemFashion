import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {

    title: string;
    file: any[] = [];

    formGroup = this.fb.group({
        id: [''],
        fullName: ['', [Validators.required]],
        photo: ['', []],
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        birthDate: ['', [Validators.required]],
        siginDate: new Date(),
        status: [1]
    })

    constructor(private readonly fb: FormBuilder,
                private readonly dialogRef: MatDialogRef<CustomerFormComponent>,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    }

    ngOnInit(): void {
        if (this.dataDialog.type === Constant.TYPE_DIALOG.NEW) {
            this.title = 'Thêm mới khách hàng';
        } else {
            this.title = 'Cập nhật khách hàng';
            this.formGroup.patchValue(this.dataDialog.row);
        }
    }

    onDismiss() {
        this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.CLOSE);
    }

    save() {
        this.formGroup.markAllAsTouched();
    }

    onChangeAvatar(event: any) {
        this.file = event.addedFiles;
    }

    onRemove(f: any) {
        this.file.splice(this.file.indexOf(f), 1);
    }
}
