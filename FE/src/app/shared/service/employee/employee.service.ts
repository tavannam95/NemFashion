import {enableProdMode, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ApiConstant} from '../../constants/ApiConstant';
import {EmployeeApiService} from './employee-api.service';
import {ToastrService} from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private toast: ToastrService,
                private emApi: EmployeeApiService) {
    }

    getAllEmployee() {
        return this.emApi.getAll()
    }

    createEmployee(employee: any) {
        this.emApi.create(employee).subscribe({
            next: value => {
                if (value.id) {
                    this.toast.success('Thêm mới thành công')
                    this.isCloseDialog.next(true)
                }
            },
            error: err => {
                this.toast.error('Thêm mới thất bại')
                this.isCloseDialog.next(false)
            }
        })
    }

    updateEmployee(employee: any) {
        this.emApi.create(employee).subscribe({
            next: value => {
                this.toast.success('Cập nhập thành công')
                this.isCloseDialog.next(true)
            },
            error: err => {
                this.toast.error('Cập nhập thất bại')
                this.isCloseDialog.next(false)
            }
        })
    }
}
