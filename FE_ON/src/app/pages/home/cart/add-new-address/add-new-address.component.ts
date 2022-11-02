import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Constants} from "../../../../shared/constants/constants.module";
import {FormBuilder} from "@angular/forms";
import {AddressService} from "../../../../shared/service/address/address.service";
import {ToastrService} from "ngx-toastr";
import {BehaviorSubject} from "rxjs";
import {StorageService} from "../../../../shared/service/storage.service";

@Component({
  selector: 'app-add-new-address',
  templateUrl: './add-new-address.component.html',
  styleUrls: ['./add-new-address.component.css']
})
export class AddNewAddressComponent implements OnInit {
  title: string = '';

  cities!: any[];
  districts!: any[];
  wards!: any[];
  defaultAddress: number = 0;

  formGroup = this.fb.group({
    id: [null],
    city: [-1],
    district: [-1],
    ward: [-1],
    other: [],
    customer: {
      id: this.storageService.getIdFromToken()
    },
    status: [0]
  })

  constructor(private readonly matDialogRef: MatDialogRef<AddNewAddressComponent>,
              @Inject(MAT_DIALOG_DATA) public matDataDialog: any,
              private readonly fb: FormBuilder,
              private readonly addressService: AddressService,
              private readonly toastService: ToastrService,
              private readonly storageService: StorageService) {
  }

  ngOnInit(): void {
    if (this.matDataDialog.type === Constants.TYPE_DIALOG.NEW) {
      this.title = "Thêm mới địa chỉ";
    } else {
      this.title = "Cập nhật địa chỉ";
      this.formGroup.patchValue(this.matDataDialog.row);
      console.log(this.matDataDialog.row)
    }
    this.getCity();
  }

  getCity() {
    this.addressService.getCity().subscribe(res => {
      this.cities = res as any[];
    })
  }

  getDistrict(code: any) {
    this.addressService.getDistrict(code).subscribe((res: any) => {
      this.districts = res.districts as [];
      if (this.matDataDialog.type === Constants.TYPE_DIALOG.NEW) {
        this.formGroup.patchValue({district: this.districts[0].name});
        this.getWard(this.districts[0].code);
      }
    })
  }

  getWard(code: any) {
    this.addressService.getWard(code).subscribe((res: any) => {
      this.wards = res.wards as [];
      if (this.matDataDialog.type === Constants.TYPE_DIALOG.NEW) {
        this.formGroup.patchValue({ward: this.wards[0].name});
      }
    })
  }

  onClose() {
    this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.CLOSE);
  }

  onSave() {
    if (this.formGroup.getRawValue().city === -1 ||
      this.formGroup.getRawValue().district === -1 ||
      this.formGroup.getRawValue().ward === -1) {
      this.toastService.warning("Vui lòng chọn đầy đủ thông tin !")
      return;
    }

    if (this.matDataDialog.type === Constants.TYPE_DIALOG.NEW) {
      if (this.matDataDialog.listAddress.length == 0) {
        this.formGroup.patchValue({status: 1});
      }
      this.addressService.createAddress(this.formGroup.getRawValue())
        .subscribe((data: any) => {
          if (data.id) {
            console.log(data);
            this.toastService.success("Thêm mới địa chỉ thành công !")
          } else {
            this.toastService.error("Thêm mới địa chỉ thất bại !")
          }
        })
    } else {
      if (this.defaultAddress === 1) {
        this.addressService.findAddressByStatus(this.storageService.getIdFromToken()).subscribe((data: any) => {
          if (data.id != this.matDataDialog.row.id) {
            data.status = 0;
            this.addressService.updateAddress(data.id, data).subscribe(res => {
              console.log(res)
            })
          }
        })
        this.formGroup.patchValue({status: 1});
      } else {
        this.formGroup.patchValue({status: this.matDataDialog.row.status});
      }
      this.addressService.updateAddress(this.matDataDialog.row.id, this.formGroup.getRawValue())
        .subscribe((data: any) => {
          if (data.id) {
            this.toastService.success("Cập nhật địa chỉ thành công !")
          } else {
            this.toastService.error("Cập nhật địa chỉ thất bại !")
          }
        })
    }

    this.matDialogRef.close(Constants.RESULT_CLOSE_DIALOG.SUCCESS);
  }

  onClickDefaultAddress(event: any) {
    console.log(event.target.value)
    if (event.target.value == 'on') {
      this.defaultAddress = 1;
      event.target.value = 'off'
    } else {
      event.target.value = 'on'
    }
  }

}
