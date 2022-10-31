import { Component, Inject, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ProductDetailService } from '../../../../../shared/service/productDetail/product-detail.service';
import { ConfirmDialogComponent } from '../../../../../shared/confirm-dialog/confirm-dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Constant } from '../../../../../shared/constants/Constant';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-import-excel-dialog',
  templateUrl: './import-excel-dialog.component.html',
  styleUrls: ['./import-excel-dialog.component.scss']
})
export class ImportExcelDialogComponent implements OnInit {
  excel: any;
  productDetailDto: any = [];

  constructor(
    private readonly productDetailService: ProductDetailService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private toastrService: ToastrService,
    ) { }

  ngOnInit() {
  }

  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      const dataString = JSON.stringify(jsonData);
      this.excel = JSON.parse(dataString.slice(dataString.indexOf('['), dataString.lastIndexOf(']')+1))
    }
    reader.readAsBinaryString(file);
  }
  
  createProductDetailByXLSX(){
    if (this.excel == null) {
      this.toastrService.error('Bạn chưa chọn file');
      return;
    }
    this.productDetailDto = [];
    for (let i = 0; i < this.excel.length; i++) {
      this.productDetailDto.push({
        product: {id: this.dataDialog},
        color: {id: this.excel[i].colorId},
        size: {id: this.excel[i].sizeId},
        quantity: this.excel[i].quantity
      })
    }
    console.log(this.productDetailDto);
    
    this.productDetailService.createProductDetail(this.productDetailDto).subscribe({
      next: (res)=>{
        this.toastrService.success('Thêm chi tiết thành công');
      },
      error: (err)=>{
        this.toastrService.error('Lỗi thêm chi tiết sản phẩm');
      }
    })
    
  }
}
