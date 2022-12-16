import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-exchange-order-dialog',
  templateUrl: './exchange-order-dialog.component.html',
  styleUrls: ['./exchange-order-dialog.component.css']
})
export class ExchangeOrderDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
  ) { }

  ngOnInit() {
    console.log(this.dataDialog);
  }

}
