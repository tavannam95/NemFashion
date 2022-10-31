import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserOrderComponent} from "../user-order/user-order.component";
import {Constants} from "../../../../shared/constants/constants.module";

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<UserOrderComponent> ,
               @Inject(MAT_DIALOG_DATA) public data: MatDialog ) { }

  ngOnInit(): void {
  }

  files: File[] = [];

  onSelect( event:any ) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event:any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  onCancel(){
    this.dialogRef.close( Constants.RESULT_CLOSE_DIALOG.CLOSE )
  }

}
