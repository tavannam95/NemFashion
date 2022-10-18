import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ProductService } from '../../../../shared/service/product/product.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../../shared/service/category/category.service';
import { CategoryCreateDialogComponent } from '../category-create-dialog/category-create-dialog.component';
import { Regex } from '../../../../shared/validators/Regex';
import { UploadCloudinaryService } from '../../../../shared/service/cloudinary/upload-cloudinary.service';

@Component({
  selector: 'app-product-edit-dialog',
  templateUrl: './product-edit-dialog.component.html',
  styleUrls: ['./product-edit-dialog.component.scss']
})
export class ProductEditDialogComponent implements OnInit {

  thumnailFile: any[] = [];
  thumnailUrl!: any;

  categories: any;

  product: any;
  productFG = this.fb.group({
    id: [''],
    name: ['', [Validators.required, Validators.pattern(Regex.unicodeAndNumber)]],
    price: ['',[Validators.min(1),Validators.required]],
    status: [''],
    thumnail: [''],
    updateDate: [''],
    createDate: [''],
    description: [''],
    category: this.fb.group({
      id: ['',Validators.required]
    }),
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private uploadService: UploadCloudinaryService
  ) { }

  ngOnInit() {
    this.productFG.patchValue(this.dataDialog);
    
    // this.getProductById();
    this.getAllCategory();
  }

  async uploadThumnail() {
    const formData = new FormData();
    formData.append('files', this.thumnailFile[0]);
    try {
      this.thumnailUrl = await this.uploadService.upload(formData).toPromise();
    } catch (err) {
      console.log(err);
    }
  }

  async updateProduct(){
    this.productFG.markAllAsTouched();
    if (this.thumnailFile.length > 0) {
      await this.uploadThumnail();
      this.productFG.patchValue({thumnail: this.thumnailUrl[0]});
    }
    if (this.productFG.valid) {
      this.productService.updateProduct(this.productFG.value, this.productFG.value.id);
    }
  }

  getAllCategory(){
    return this.categoryService.getAllCategory().subscribe({
      next: (res) => {
          //Gán data vào biến
          this.categories = res;
        },
      error: (err) => {
        console.log(err);
        
      }
  })
  }

  openDialogCreateCategory(){
    let dialogRef = this.dialog.open(CategoryCreateDialogComponent,{
      width: '700px',
    });
    dialogRef.afterClosed().subscribe(res=>{
      this.getAllCategory();
    })
  }

  check(){
    
    
  }

  onSelect(event) {
    if(this.thumnailFile){
      this.thumnailFile.splice(0,1);
    }
		this.thumnailFile.push(...event.addedFiles);
	}
  // End image thumnail product

  //Remove image
	onRemove(f: any) {
      this.thumnailFile.splice(this.thumnailFile.indexOf(f), 1);
      this.thumnailUrl = '';
	}
}
