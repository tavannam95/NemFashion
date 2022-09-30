import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Constant} from '../../../../shared/constants/Constant';
import {FormBuilder} from '@angular/forms';
import {StaffListComponent} from '../staff-list/staff-list.component';

@Component({
    selector: 'app-staff-form',
    templateUrl: './staff-form.component.html',
    styleUrls: ['./staff-form.component.scss']
})
export class StaffFormComponent implements OnInit {
    TYPE_DIALOG = Constant.TYPE_DIALOG ;
    title = '' ;
    isDropZoneActive = false;
    imageSource = '';
    textVisible = true;
    progressVisible = false;
    progressValue = 0;

    constructor(private fb: FormBuilder ,
                @Inject(MAT_DIALOG_DATA) public dataDialog?: any ,
                private dialogRef?: MatDialogRef<StaffListComponent>
                ) {
        // this.onDropZoneEnter = this.onDropZoneEnter.bind(this);
        // this.onDropZoneLeave = this.onDropZoneLeave.bind(this);
        this.onUploaded = this.onUploaded.bind(this);
        // this.onProgress = this.onProgress.bind(this);
        // this.onUploadStarted = this.onUploadStarted.bind(this);
    }

    onDropZoneEnter(e) {
        if (e.dropZoneElement.id === 'dropzone-external') { this.isDropZoneActive = true; }
    }

    onDropZoneLeave(e) {
        if (e.dropZoneElement.id === 'dropzone-external') { this.isDropZoneActive = false; }
    }

    onUploaded(e) {
        const file = e.file;
        const fileReader = new FileReader();
        fileReader.onload = () => {
            this.isDropZoneActive = false;
            this.imageSource = fileReader.result as string;
        };
        console.log(file)
        fileReader.readAsDataURL(file);
        this.textVisible = false;
        this.progressVisible = false;
        this.progressValue = 0;
    }

    onProgress(e) {
        this.progressValue = e.bytesLoaded / e.bytesTotal * 100;
    }

    onUploadStarted($event: any) {
        this.imageSource = '';
        this.progressVisible = true;
    }

    ngOnInit(): void {
        if ( this.dataDialog.type === this.TYPE_DIALOG.NEW ) {
            this.title = 'Thêm mới nhân viên'
        }
    }


    onDismiss() {
        this.dialogRef.close( Constant.RESULT_CLOSE_DIALOG.CLOSE ) ;
    }



}
