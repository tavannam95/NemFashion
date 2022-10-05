import { Component, OnInit } from '@angular/core';

interface Size{
  value: number;
  viewValue: string
}

@Component({
  selector: 'app-product-detail-form',
  templateUrl: './product-detail-form.component.html',
  styleUrls: ['./product-detail-form.component.scss']
})
export class ProductDetailFormComponent implements OnInit {

  color: string = '#ff12ff';
  selectedSize: Size[] = [];
  size: Size[] = [
    {
      value: 1,
      viewValue: 'S'
    },
    {
      value: 2,
      viewValue: 'M'
    },
    {
      value: 3,
      viewValue: 'L'
    },
    {
      value: 4,
      viewValue: 'XL'
    },
    {
      value: 5,
      viewValue: '2XL'
    },
    {
      value: 6,
      viewValue: '3XL'
    },
    
  ];

  files: File[] = [];
  constructor() { }

  ngOnInit() {
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

  clickSize(size){
    let index = this.selectedSize.findIndex(i => i.value == size.value);
    if (index == -1) {
      this.selectedSize.push(size);
    }else{
      this.selectedSize.splice(index,1);
    }
    console.log(this.selectedSize);
  }
  
  onChangeColor(event){
    console.log(event.target.value);
    this.color = event.target.value;
  }

  // Reset when submit form
  onSubmit(){
    this.color = '#ff12ff';
    this.selectedSize = [];
    this.files = [];
  }

  finish(){
    
  }

}
