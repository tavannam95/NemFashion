import { Component, Inject, OnInit } from "@angular/core";
import { FileUploadService } from "../../../../service/file-upload.service";
import { ThemePalette } from '@angular/material/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Regex } from '../../../../shared/validators/Regex';
import { CategoryService } from '../../../../shared/service/category/category.service';
import {ProductService} from "../../../../shared/service/product/product.service";


// Fake data
interface Category {
  id: number;
  name: string;
  image: string;
  createDate: Date;
  updateDate: Date;
  status: number
}

// Fake size
export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: "product-form",
  templateUrl: "./product-form.component.html",
  styleUrls: ["./product-form.component.scss"],
})
export class ProductFormComponent implements OnInit {
  shortLink: string = "";
  loading: boolean = false;
  file: File = null;
  centered = false;
  disabled = false;
  unbounded = false;

  productId: number;

  // categorySelectedCheck = false;
  //
  // categorySelected: any;

  files: File[] = [];
  detailFiles: File[] = [];
  
  isLoading: boolean = false;

  // Fake category
  categories: any;

  formGroup = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(Regex.unicode)]],
    category: this.fb.group({
      id: ['',Validators.required]
    }),
    price: ['',[Validators.min(1),Validators.required]],
    description: ['']
  })

  constructor(
    private fileUploadService: FileUploadService,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  check(){
    console.log(this.formGroup.value);
  }

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
          console.log(err)
      }
  })
  }

  createProduct(){
    if (this.formGroup.valid){
      this.productService.createProduct(this.formGroup.value).subscribe(res=>{
        this.productId = res.id;
        console.log(this.productId);
      })
    }
  }

  ngOnInit(): void {
    this.getAllCategory();
  }
  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === "object") {
        // Short link via api response
        this.shortLink = event.link;

        this.loading = false; // Flag variable
      }
    });
  }

  //Select image
	onSelect(event) {
    if(this.files){
      this.files.splice(0,1);
    }
		console.log(event);
		this.files.push(...event.addedFiles);
    
	}
  //Remove image
	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
	}
  //Select image
	onSelectDetail(event) {
		console.log(event);
		this.detailFiles.push(...event.addedFiles);
    
	}
  //Remove image
	onRemoveDetail(event) {
		console.log(event);
		this.detailFiles.splice(this.detailFiles.indexOf(event), 1);
	}
  
  
}
