import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder} from '@angular/forms';
import {PromotionComponent} from '../promotion.component';
import {CategoryService} from '../../../../shared/service/category/category.service';
import {ProductService} from '../../../../shared/service/product/product.service';

@Component({
  selector: 'promotion-product',
  templateUrl: './promotion-product.component.html',
  styleUrls: ['./promotion-product.component.scss']
})
export class PromotionProductComponent implements OnInit  {

  displayedColumns: string[] = ['select' , 'name', 'price', 'action'];
  dataSource = new MatTableDataSource()
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  type =1 ;
  listCate: any[] = []
  listPro: any[] = []

  form = this.fb.group({
     category: 0 ,
     htgg: 1 ,
     startPrice: null ,
     endPrice: null
  })

  constructor( private fb: FormBuilder ,
               public dialogRef: MatDialogRef<PromotionComponent>,
               private categoryService: CategoryService ,
               private productService: ProductService ,
               @Inject(MAT_DIALOG_DATA) public data: any ) {
  }

  getAllCategory(){
     this.categoryService.getAllCategory().subscribe( (value:any) => {
         this.listCate = value ;
     })
  }

  getProByCate(){
     this.productService.getProByCate(this.form.getRawValue() ).subscribe( (value:any) => {
         this.listPro = value ;
         this.dataSource = new MatTableDataSource<any>(value);
         this.dataSource.paginator = this.paginator;
     })
  }

  onSearch(){
      if( this.form.getRawValue().category == 0 ){
          this.form.patchValue({
              category: null
          })
      }

      this.getProByCate();
  }

  ngOnInit(): void {
     this.getAllCategory();
     this.onSearch();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
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

  changeHTGG(data:any){
     this.type = data ;
  }

  onClose(){
     this.dialogRef.close() ;
  }
}

