import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {PromotionComponent} from '../promotion.component';
import {Constant} from '../../../../shared/constants/Constant';

@Component({
  selector: 'promotion-form',
  templateUrl: './promotion-form.component.html',
  styleUrls: ['./promotion-form.component.scss']
})
export class PromotionFormComponent implements OnInit {

  title = ''

  form = this.fb.group({
      name: null ,
      discount: null ,
      startDate: null ,
      andDate: null ,
      status: 1 ,
  })

  constructor( private fb: FormBuilder ,
               public dialogRef: MatDialogRef<PromotionComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
     if( this.data.type == Constant.TYPE_DIALOG.NEW ){
        this.title = 'Thêm mới'
     }else{
        this.title = 'Cập nhập'
     }
  }

  onClose(){
     this.dialogRef.close();
  }

}
