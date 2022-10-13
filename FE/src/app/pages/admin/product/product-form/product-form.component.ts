import { Component, Inject, OnInit } from "@angular/core";
import { FileUploadService } from "../../../../service/file-upload.service";
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Regex } from '../../../../shared/validators/Regex';
import { CategoryService } from '../../../../shared/service/category/category.service';
import {ProductService} from "../../../../shared/service/product/product.service";
import {UploadCloudinaryService} from "../../../../shared/service/upload-cloudinary.service";


@Component({
  selector: "product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  shortLink: string = "";
  loading: boolean = false;
  thumnailFile: any[] = [];
  thumnailUrl!: any;

  imagesFile: any[] = [];
  imagesUrl!: any;

  productId: number;

  // categorySelectedCheck = false;
  //
  // categorySelected: any;

  isLoading: boolean = false;

  // Fake category
  categories: any;

  formGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(Regex.unicode)]],
    category: this.fb.group({
      id: ['',Validators.required]
    }),
    price: ['',[Validators.min(1),Validators.required]],
    description: [''],
    thumnail: ['']
  })

  constructor(
    private fileUploadService: FileUploadService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private readonly uploadService: UploadCloudinaryService,
  ) {}

  //Get category and fill to selection
  getAllCategory(){
    this.isLoading = true;
    return this.categoryService.getAllCategory().subscribe({
      next: (res) => {
          this.isLoading = false;
          //Gán data vào biến
          this.categories = res;
        },
      error: (err) => {
          this.isLoading = false;
      }
  })
  }

  check(){
  }

  async createProduct() {
    this.formGroup.markAllAsTouched();
    if (this.thumnailFile.length > 0) {
      await this.uploadThumnail();
    }
    if (this.formGroup.valid) {
      this.formGroup.patchValue({thumnail: this.thumnailUrl[0]});
      this.productService.createProduct(this.formGroup.value).subscribe(res => {
        this.productId = res.id;
      })
    }
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  // Image thumnail product
  // On file Select
  onChange(event) {
    this.thumnailFile = event.addedFiles;
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    this.fileUploadService.upload(this.thumnailFile).subscribe((event: any) => {
      if (typeof event === "object") {
        // Short link via api response
        this.shortLink = event.link;

        this.loading = false; // Flag variable
      }
    });
  }

  // Upload image
  async uploadThumnail() {
    const formData = new FormData();
    formData.append('files', this.thumnailFile[0]);
    try {
      this.thumnailUrl = await this.uploadService.upload(formData).toPromise();
    } catch (err) {
      console.log(err);
    }
  }
  //Select image
  async uploadImages() {
    const formData = new FormData();
    for (let i = 0; this.imagesFile.length < 0; i++) {
      formData.append('files', this.imagesFile[i]);
    }
    try {
      this.imagesUrl = await this.uploadService.upload(formData).toPromise();
    } catch (err) {
      console.log(err);
    }
  }
	onSelect(event) {
    if(this.thumnailFile){
      this.thumnailFile.splice(0,1);
    }
		this.thumnailFile.push(...event.addedFiles);
    
	}
  // End image thumnail product

  // Table Images
  //Remove image
	onRemove(f: any) {
      this.imagesFile.splice(this.thumnailFile.indexOf(f), 1);
      this.imagesUrl = '';
	}
  //Select image
	onSelectDetail(event) {
		this.imagesFile.push(...event.addedFiles);
    
	}
  //Remove image
	onRemoveDetail(event) {
		this.imagesFile.splice(this.imagesFile.indexOf(event), 1);
	}
  
  // End table image
}
