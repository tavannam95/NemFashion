import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {OrderDetailService} from "../../../../../shared/service/order-detail/order-detail.service";
import {FormBuilder} from "@angular/forms";
import {MatStepper} from "@angular/material/stepper";
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";

@Component({
  selector: 'app-exchange-order-dialog',
  templateUrl: './exchange-order-dialog.component.html',
  styleUrls: ['./exchange-order-dialog.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: {displayDefaultIndicatorType: false, showError: true}
  }]
})
export class ExchangeOrderDialogComponent implements OnInit {

  displayedColumns: string[] = ['select', 'stt', 'productImage', 'productName', 'color', 'size', 'quantity'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  selection = new SelectionModel<any>(true, []);

  orderDetail: any[] = [];
  quantity: number = 0;
  formGroup = this.fb.group({
    id: [''],
    quantity: ['']
  });

  rowSelected: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private readonly orderDetailService: OrderDetailService,
    private readonly fb: FormBuilder
  ) {
  }

  ngOnInit() {
    if (this.dataDialog.id) {
      this.orderDetailService.getOrderDetailByOrderId(this.dataDialog.id).subscribe(res => {
        this.orderDetail = res as any[];
        this.dataSource = new MatTableDataSource<any>(this.orderDetail);
        this.dataSource.data = this.orderDetail;
        console.log(this.orderDetail);
      })
    }
  }

  onChooseProduct(stepper: MatStepper) {
    console.log(this.selection.selected);
    console.log(this.quantity)
    this.goForward(stepper);
  }

  onChooseReason(stepper: MatStepper) {
    this.goForward(stepper);
  }

  setQuantity($event: any, i: any, row: any) {
    this.quantity = $event.target.value;
    console.log({
      $event,
      i,
      row
    })
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    stepper.next();
  }


  isDisabled(row: any) {
    for (const e of this.selection.selected) {
      if (e.productsDetail.id === row.productsDetail.id) {
        return true;
      }
    }
    return false;
  }
}
