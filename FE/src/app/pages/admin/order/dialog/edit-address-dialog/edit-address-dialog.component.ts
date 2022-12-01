import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AddressService } from '../../../../../shared/service/address/address.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Regex } from '../../../../../shared/validators/Regex';

@Component({
  selector: 'app-edit-address-dialog',
  templateUrl: './edit-address-dialog.component.html',
  styleUrls: ['./edit-address-dialog.component.scss']
})
export class EditAddressDialogComponent implements OnInit {
  isLoading: boolean = false;

  provinces: any[];
  districts: any[];
  wards: any[];

  provinceName: any;
  districtName: any;
  wardName: any;
  formGroup = this.fb.group({
    provinceId: [-1],
    provinceName: [''],
    districtId: [-1],
    districtName: [''],
    wardId: [-1],
    wardName: [''],
    other: ['',[Validators.required, Validators.pattern(Regex.unicodeAndNumber)]],
  })

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private toastService: ToastrService
  ) { }

  ngOnInit() {
    this.getProvince();
  }

  onSubmit(){
    this.formGroup.markAllAsTouched();
    if (this.formGroup.getRawValue().provinceId === -1 ||
        this.formGroup.getRawValue().districtId === -1 ||
        this.formGroup.getRawValue().wardId === -1
    ) {
      this.toastService.warning("Vui lòng chọn đầy đủ thông tin !")
      return;
    }
    this.formGroup.patchValue({
      wardName: this.wardName,
      districtName: this.districtName,
      provinceName: this.provinceName
    })
    let addressName = 
      this.formGroup.getRawValue().other + ', '
      + this.wardName + ', ' + this.districtName + ', ' + this.provinceName;
    console.log(addressName);
  }

  getProvince() {
    this.addressService.getProvince().subscribe((res: any) => {
      this.provinces = res.data;
    })
  }
  getDistrict(provinceId: any, provinceName: any) {
    this.addressService.getDistrict(provinceId).subscribe((res: any) => {
      this.districts = res.data;
    })
    this.provinceName = provinceName;
  }

  getWard(districtId: any, districtName: any) {
    this.addressService.getWard(districtId).subscribe((res: any) => {
      this.wards = res.data;
    })
    this.districtName = districtName;
  }

  resetDistrictAndWard() {
    this.formGroup.patchValue({districtId: -1});
    this.formGroup.patchValue({wardId: -1});
    this.districts = [];
    this.wards = [];
  }

  resetWard() {
    this.formGroup.patchValue({wardId: -1});
    this.wards = [];
  }

  getWardName(wardName: any) {
    this.wardName = wardName;
  }

}
