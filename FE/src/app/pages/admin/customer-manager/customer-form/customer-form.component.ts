import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';
import {FormBuilder, Validators} from '@angular/forms';
import {CustomerService} from '../../../../shared/service/customer.service';
import {UploadCloudinaryService} from '../../../../shared/service/upload-cloudinary.service';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss'],
})
export class CustomerFormComponent implements OnInit {

    title: string;
    avatarFile: any[] = [];
    avatarUrl!: any;
    avatarUrlEdit: any;
    isLoadingButton: boolean = false;
    isUpdate: boolean = false;
    isShowPassword: boolean = true;

    formGroup = this.fb.group({
        id: [''],
        fullname: ['', [Validators.required]],
        photo: ['', []],
        email: ['', [Validators.required, Validators.pattern('^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$')]],
        password: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern(/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/)]],
        birthDate: ['', [Validators.required]],
        siginDate: new Date(),
        status: [1]
    })

    constructor(private readonly fb: FormBuilder,
                private readonly dialogRef: MatDialogRef<CustomerFormComponent>,
                private readonly customerService: CustomerService,
                private readonly uploadService: UploadCloudinaryService,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    }

    ngOnInit(): void {
        if (this.dataDialog.type === Constant.TYPE_DIALOG.NEW) {
            this.isUpdate = true;
            this.title = 'Thêm mới khách hàng';
        } else {
            this.title = 'Cập nhật khách hàng';
            this.isShowPassword = false;
            this.avatarUrlEdit = this.dataDialog.row.photo;
            this.formGroup.patchValue(this.dataDialog.row);
        }
    }

    onDismiss() {
        this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.CLOSE);
    }

    onChangeAvatar(event: any) {
        this.avatarFile = event.addedFiles;
    }

    async uploadImage() {
        const formData = new FormData();
        formData.append('files', this.avatarFile[0]);
        try {
            this.avatarUrl = await this.uploadService.upload(formData).toPromise();
        } catch (err) {
            console.log(err);
        }
    }

    onRemove(f: any) {
        this.avatarFile.splice(this.avatarFile.indexOf(f), 1);
    }

    async save() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.invalid) {
            return;
        }

        this.isLoadingButton = true;

        if (this.avatarFile.length > 0) {
            await this.uploadImage();
        }

        if (this.dataDialog.type === Constant.TYPE_DIALOG.NEW) {
            if (this.avatarUrl != undefined) {
                this.formGroup.patchValue({photo: this.avatarUrl[0]});
            } else {
                this.formGroup.patchValue({photo: 'https://res.cloudinary.com/nemfashion/image/upload/v1664814655/unknow_ejzkbl.jpg'});
            }
            this.customerService.createCustomer(this.formGroup.getRawValue());
        } else {
            if (this.avatarUrl != undefined) {
                this.formGroup.patchValue({photo: this.avatarUrl[0]});
            } else {
                this.formGroup.patchValue({photo: this.dataDialog.row.photo});
            }
            this.customerService.updateCustomer(this.formGroup.getRawValue(), this.dataDialog.row.id);
        }

        this.customerService.isCloseDialog.subscribe(value => {
            if (value) {
                this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS);
                this.customerService.isCloseDialog.next(false);
            }
            this.isLoadingButton = false;
        })
    }

}
