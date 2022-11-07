import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {UserProflleComponent} from "../user-proflle.component";

@Component({
  selector: 'app-user-profile-image',
  templateUrl: './user-profile-image.component.html',
  styleUrls: ['./user-profile-image.component.css']
})
export class UserProfileImageComponent implements OnInit {

  title = 'Cập nhập hình ảnh'
  avatarFile: any[] = [];
  avatarUrl!: any;
  employee: any;
  avatarUrlEdit: any;

  constructor( private dialogRef: MatDialogRef<UserProflleComponent>)   {
  }

  ngOnInit(): void {
  }

  onDismiss() {
    this.dialogRef.close()
  }

  onChangeAvatar(event: any) {
    this.avatarFile = event.addedFiles;
  }

  saveImage(){
    this.uploadImage()
  }

  async uploadImage() {
    // const formData = new FormData();
    // formData.append('files', this.avatarFile[0]);
    // try {
    //   this.avatarUrl = await this.uploadService.upload(formData).toPromise();
    //   this.employee.photo = this.avatarUrl[0]
    //   console.log( this.avatarUrl )
    //   this.employeeService.updateEmployee(this.employee);
    //
    //   this.employeeService.isCloseDialog.subscribe(
    //     value => {
    //       if (value) {
    //         this.dialogRef.close(Constant.RESULT_CLOSE_DIALOG.SUCCESS)
    //         this.employeeService.isCloseDialog.next(false);
    //       }
    //     }
    //   )
    // } catch (err) {
    //   console.log(err);
    // }
  }

  onRemove(f: any) {
    this.avatarFile.splice(this.avatarFile.indexOf(f), 1);
  }

}
