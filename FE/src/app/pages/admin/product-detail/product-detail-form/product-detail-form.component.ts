import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { SizeService } from '../../../../shared/service/size/size.service';
import { ColorService } from '../../../../shared/service/color/color.service';
import { ProductDetailService } from '../../../../shared/service/productDetail/product-detail.service';

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

  files: File[] = [];

  sizeQuantityBoolean: boolean = false;

  productId: any;
  colorId: any = {
    id: '',
    code:''
  };

  colorFormGroup = this.fb.group({
    code: ['#ff12ff', Validators.required]
  })

  sizeFormGroup = this.fb.group({
    1: [''],
    2: [''],
    3: [''],
    4: [''],
    5: [''],
    6: [''],
  })
  // Size Color API create
  productDetailFormGroup = this.fb.group({
    product: this.fb.group({
      id: ['']
    }),
    color: this.fb.group({
      id: ['']
    }),
    size: this.fb.group({
      id: ['']
    }),
    quantity: ['']
  })

  sizes: any;

  s: boolean = false;
  m: boolean = false;
  l: boolean = false;
  xl: boolean = false;
  xxl: boolean = false;
  xxxl: boolean = false;
  
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private readonly sizeService: SizeService,
    private readonly colorService: ColorService,
    private readonly productDetailService: ProductDetailService,
  ) { }

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id');
  }
   
  createProductDetail(){
      for (let i = 0; i < Object.keys(this.sizeFormGroup.value).length; i++) {
        if (Object.values(this.sizeFormGroup.value)[i] != "") {
          this.productDetailFormGroup.patchValue({color: {id: this.colorId.id}});
          this.productDetailFormGroup.patchValue({size: {id: Object.keys(this.sizeFormGroup.value)[i]}});
          this.productDetailFormGroup.patchValue({quantity: Object.values(this.sizeFormGroup.value)[i]});
          this.productDetailFormGroup.patchValue({product:{id: this.productId}});
          this.productDetailService.createProductDetail(this.productDetailFormGroup.value);
        }
      }
  }

  createColor(){
    this.colorFormGroup.markAllAsTouched();
    this.sizeQuantityBoolean = !this.sizeQuantityBoolean;
      if (this.colorFormGroup.valid) {
        this.colorService.createColor(this.colorFormGroup.value).subscribe(res =>{
          this.colorId = res;
        })
      }
  }

  check(){
    // this.colorService.createColor(this.colorFormGroup.value).subscribe(res =>{
    //   this.colorId = res;
    // });
    // console.log(Object.keys(this.sizeFormGroup.value)[0]);
    // console.log(Object.values(this.sizeFormGroup.value)[0]);
    this.createProductDetail();
  }

  selectSize(size: string){
    if (size == 's') {
      this.s = !this.s;
    }
    if (size == 'm') {
      this.m = !this.m;
    }
    if (size == 'l') {
      this.l = !this.l;
    }
    if (size == 'xl') {
      this.xl = !this.xl;
    }
    if (size == '2xl') {
      this.xxl = !this.xxl;
    }
    if (size == '3xl') {
      this.xxxl = !this.xxxl;
    }
  }

  //Select image
	onSelect(event) {
    if(this.files){
      this.files.splice(0,1);
    }
		this.files.push(...event.addedFiles);
    
	}
  //Remove image
	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
	}

  onChangeColor(event){
    this.colorFormGroup.patchValue({code: event.target.value});
  }

  // Reset when submit form
  onSubmit(){
    this.colorFormGroup.patchValue({code: '#ff12ff'});
    this.files = [];
  }

  finish(){
    
  }

}
