import {Injectable} from '@angular/core';
import {CustomerApiService} from './customer-api.service';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    isCloseDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private readonly apiService: CustomerApiService,
                private readonly toastService: ToastrService) {
    }

    getAllCustomer() {
        return this.apiService.getAllCustomer();
    }

    getCustomer(id: number) {
        return this.apiService.getCustomer(id);
    }

    createCustomer(data: any) {
        return this.apiService.createCustomer(data).subscribe({
                next: (res) => {
                    if (res.id) {
                        console.log(res);
                        this.toastService.success('Tạo mới khách hàng thành công !');
                        this.isCloseDialog.next(true);
                    }
                },
                error: (err) => {
                    console.log(err);
                    if (err.error.code == 'UNIQUE_FIELD') {
                        this.toastService.error(err.error.message);
                    }
                    this.toastService.error('Tạo mới khách hàng thất bại !');
                    this.isCloseDialog.next(false);
                }
            }
        )
    }

    updateCustomer(data: any, id: number) {
        return this.apiService.updateCustomer(data, id).subscribe({
                next: (res) => {
                    if (res.id) {
                        console.log(res);
                        this.toastService.success('Cập nhật khách hàng thành công !');
                        this.isCloseDialog.next(true);
                    }
                },
                error: (err) => {
                    console.log(err);
                    this.toastService.error('Cập nhật khách hàng thất bại !');
                    this.isCloseDialog.next(false);
                }
            }
        )
    }

    deleteCustomer(data: any, id: number) {
        return this.apiService.deleteCustomer(data, id).subscribe({
            next: (res) => {
                console.log(res)
                this.toastService.success('Thay đổi trạng thái thành công !');
            },
            error: (err) => {
                console.log(err)
                this.toastService.error('Thay đổi trạng thái thất bại !');
            }
        })
    }

}
