import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';

@Component({
    selector: 'app-customer-form',
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

    title: string;
    file: any[] = [];

    constructor(private readonly dialogRef: MatDialogRef<CustomerFormComponent>,
                @Inject(MAT_DIALOG_DATA) public dataDialog: any) {
    }

    ngOnInit(): void {
        if (this.dataDialog.type === Constant.TYPE_DIALOG.NEW) {
            this.title = 'Thêm mới khách hàng';
        } else {
            this.title = 'Cập nhật khách hàng';
        }
    }

    onDismiss() {
        this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.CLOSE);
    }

    save() {

    }

    onChangeAvatar(event: any) {
        this.file = event.addedFiles;
    }

    onRemove(f: any) {
        this.file.splice(this.file.indexOf(f), 1);
    }
}
