import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-view-images-dialog',
  templateUrl: './product-view-images-dialog.component.html',
  styleUrls: ['./product-view-images-dialog.component.scss']
})
export class ProductViewImagesDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
    
  }



}
