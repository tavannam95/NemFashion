import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';
import {FormBuilder, Validators} from '@angular/forms';
import {CustomerService} from '../../../../shared/service/customer.service';

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
        fullname: ['', [Validators.required]],
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
                private readonly customerService: CustomerService,
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
        if (this.formGroup.invalid) {
            return;
        }

        if (this.dataDialog.type === Constant.TYPE_DIALOG.NEW) {
            this.customerService.createCustomer(this.formGroup.getRawValue());
        } else {
            this.customerService.updateCustomer(this.formGroup.getRawValue(), this.dataDialog.row.id);
        }

        this.customerService.isCloseDialog.subscribe(value => {
            if (value) {
                this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
                this.customerService.isCloseDialog.next(false);
            }
        })
    }

    onChangeAvatar(event: any) {
        this.file = event.addedFiles;
    }

    onRemove(f: any) {
        this.file.splice(this.file.indexOf(f), 1);
    }
}
