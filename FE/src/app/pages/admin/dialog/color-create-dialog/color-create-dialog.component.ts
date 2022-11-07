import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Regex } from '../../../../shared/validators/Regex';
import { ColorService } from '../../../../shared/service/color/color.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-color-create-dialog',
  templateUrl: './color-create-dialog.component.html',
  styleUrls: ['./color-create-dialog.component.scss']
})
export class ColorCreateDialogComponent implements OnInit {

  files: File[] = [];

  colorFormGroup = this.fb.group({
    name: ['', [Validators.required,Validators.pattern(Regex.unicode)]],
    code: ['', [Validators.required, Validators.pattern(Regex.codeColor)]],
  })

  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  createColor(){
    this.colorFormGroup.markAllAsTouched();
    this.colorService.createColor(this.colorFormGroup.value).subscribe({
      next: (res) =>{
        this.toastrService.success('Thêm màu sắc thành công');
      },
      error: (err) =>{
        this.toastrService.error('Thêm màu sắc thất bại')
      }
    })
  }




  onChangeColor(event){
    this.colorFormGroup.patchValue({code: event.target.value});
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
}
