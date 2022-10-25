import { Component, Inject, OnInit } from '@angular/core';
import { FileUploadService } from '../../../../../service/file-upload.service';
import { ProductImageService } from '../../../../../shared/service/productImage/product-image.service';
import { UploadCloudinaryService } from '../../../../../shared/service/cloudinary/upload-cloudinary.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'product-image-create-dialog',
  templateUrl: './product-image-create-dialog.component.html',
  styleUrls: ['./product-image-create-dialog.component.scss']
})
export class ProductImageCreateDialogComponent implements OnInit {
  imagesFile: any[] = [];
  imagesUrl!: any;
  isLoading: boolean = false;
  productImageFormGroup = this.fb.group({
    name: [''],
    product: {
      id: ['']
    }

  })
  constructor(
    @Inject(MAT_DIALOG_DATA) public dataDialog: any,
    private fileUploadService: FileUploadService,
    private productImageService: ProductImageService,
    private readonly uploadService: UploadCloudinaryService,
    private fb: FormBuilder,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  async createProductImage(){
    if(this.imagesFile.length>0){
      await this.uploadImages();
      this.productImageFormGroup.patchValue({product: {id: this.dataDialog}});
      for (let i = 0; i < this.imagesUrl.length; i++) {
        this.productImageFormGroup.patchValue({name:this.imagesUrl[i]});
        this.productImageService.createProductImage(this.productImageFormGroup.value).subscribe();
      }
      this.toastrService.success('Thêm ảnh thành công');
    }
   if (this.imagesFile.length<=0) {
    this.toastrService.warning('Bạn chưa chọn ảnh');
   }

  }
  async uploadImages() {
    this.isLoading = true;
    const formData = new FormData();
    for (let i = 0; i < this.imagesFile.length; i++) {
      formData.append('files', this.imagesFile[i]);
    }
    try {
      this.imagesUrl = await this.uploadService.upload(formData).toPromise();
      this.isLoading = false;
    } catch (err) {
      console.log(err);
      this.isLoading = false;
    }
  }

  //Select image
	onSelectDetail(event) {
		this.imagesFile.push(...event.addedFiles);
	}
  //Remove image
	onRemoveDetail(event) {
		this.imagesFile.splice(this.imagesFile.indexOf(event), 1);
    }
}
