import { Component, Inject, OnInit } from "@angular/core";
import { FileUploadService } from "../../../../service/file-upload.service";
import { ThemePalette } from '@angular/material/core';

// Fake data
interface Category {
  value: string;
  viewValue: string;
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

  files: File[] = [];
  detailFiles: File[] = [];
  
  // Fake category
  categories: Category[] = [
    {value: '1', viewValue: 'Đầm'},
    {value: '2', viewValue: 'Áo'},
    {value: '3', viewValue: 'Quần'},
    {value: '4', viewValue: 'Chân váy'},
    {value: '5', viewValue: 'Bikini'},
    {value: '6', viewValue: 'Set bộ'},
    
  ]

  constructor(
    private fileUploadService: FileUploadService,
  ) {}

  ngOnInit(): void {}
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
