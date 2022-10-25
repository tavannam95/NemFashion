import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SellingService} from "../../../../shared/service/selling/selling.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductDetailOrderComponent} from "./product-detail-order/product-detail-order.component";
import {Constant} from "../../../../shared/constants/Constant";
import {btoa} from "buffer";
import {CustomerService} from "../../../../shared/service/customer/customer.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {CustomerFormComponent} from "../../customer-manager/customer-form/customer-form.component";

@Component({
    selector: 'selling',
    templateUrl: './selling.component.html',
    styleUrls: ['./selling.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SellingComponent implements OnInit, OnDestroy {

    constructor(private sellingService: SellingService,
                private dialog: MatDialog,
                private customerService: CustomerService) {
    }


    pattern = /^[0-9]*$/
    customerInput = new FormControl('');
    quantityDetail: any = [];
    isLoading: boolean;
    listCate;
    listProduct: any;
    tabFocus: any;
    order: any = {};
    orderIndex: any;
    listOrders: any = [];
    listCustomers: any;
    noteDetail: any = [];
    filteredCustomer: Observable<any>;
    customerName = '';
    listProductSearch: any = [];
    openModal: boolean = false;
    listTien: any = [];

    ngOnInit(): void {
        this.getListCate();
        this.getListCustomer();
        setTimeout(() => this.load(), 2000);
    }


    over = 'over';
    showFiller = false;
    tabs = [];
    selected = new FormControl(0);

    addTab(selectAfterAdding: boolean) {
        if (this.tabs.length < 20) {
            this.tabs.push(this.tabs[this.tabs.length - 1] + 1);
            this.selected.setValue(this.tabs.length - 1);
            this.customerName = '';
        }
    }

    removeTab(index: number) {
        if (this.tabs.length > 1) {
            this.tabs.splice(index, 1);
            this.listOrders.splice(index, 1);
            this.setOrderLocalStorage(this.listOrders);
            if (this.selected.value == this.tabs.length) {
                this.selected.setValue(this.tabs.length - 1);
            }
            this.getItemByTabs();
        } else {
            this.tabs = [];
            localStorage.removeItem('order');
            this.getItemLocalStorage();
            this.getItemByTabs();
        }
    }

    getListCustomer() {
        this.customerService.getAllCustomer().subscribe(
            resp => {
                this.listCustomers = resp;
                this.customerFilter();
                this.tabs = [];
                this.getItemLocalStorage();
            }, error => {

            }
        )
    }

    getListCate() {
        this.isLoading = true;
        this.sellingService.getAllCategories().subscribe(
            resp => {
                this.isLoading = false;
                this.listCate = resp;
                this.fillProduct(0);
            }, error => {
                this.isLoading = false;
                console.log(error);
            }
        )
    }

    fillProduct(index: any) {
        this.isLoading = true;
        this.listProduct = [];
        if (this.listCate[index].product === undefined) {
            this.sellingService.getProByCate(this.listCate[index].id).subscribe(
                resp => {
                    this.isLoading = false;
                    this.listCate[index].product = resp;
                    this.listProduct = this.listCate[index].product;
                },
                error => {
                    this.isLoading = false;
                    console.log(error)
                }
            )
        } else {
            this.isLoading = false;
            this.listProduct = this.listCate[index].product;
        }
    }


    openDialog(product: any) {
        this.dialog.open(ProductDetailOrderComponent, {
            width: '30vw',
            disableClose: true,
            hasBackdrop: true,
            data: {
                product: product
            }
        }).afterClosed().subscribe(value => {
            if (!(value == null || value == undefined)) {
                let hd: any = {};
                hd.id = this.tabs[this.selected.value];
                hd.note = '';
                hd.customer = '';
                hd.detail = {
                    id: value.id,
                    price: value.price,
                    quantity: value.quantityOrder,
                    quantityInventory: value.quantityInventory,
                    colorId: value.colorId,
                    colorCode: value.nameColor,
                    sizeId: value.sizeId,
                    sizeCode: value.nameSize,
                    name: value.productName,
                };
                this.pushDataToLocalStorage(hd);
                // localStorage.setItem('order',JSON.stringify(hd));
                //
                // this.getItemLocalStorage();

            }
        })
    }


    getItemLocalStorage() {
        let orders = JSON.parse(localStorage.getItem('order'));
        if (orders === null) {
            this.tabs.push(1);
        } else {
            orders.forEach(order => {
                this.tabs.push((order.id))
            });
        }
        this.listOrders = orders;
    }

    getItemByTabs() {
        if (this.listOrders === null) {
            let orders: any = [];
            let order: any = {};
            order.id = this.tabs[this.tabs.length - 1];
            order.totalPrice = 0
            order.totalQuantity = 0
            order.note = '';
            order.customer = '';
            order.orderDetail = [];
            orders.push(order);
            this.order = order;
            this.setOrderLocalStorage(orders);
            this.listOrders = orders;
            return;
        }
        this.orderIndex = this.listOrders.findIndex(o => o.id == this.tabs[this.selected.value]);
        let order = this.listOrders[this.orderIndex];
        if (order === null || order === undefined) {
            order = {};
            order.id = this.tabs[this.tabs.length - 1];
            order.totalPrice = 0;
            order.totalQuantity = 0;
            order.note = '';
            order.customer = '';
            order.orderDetail = [];
            this.listOrders.push(order);
            this.setOrderLocalStorage(this.listOrders);
            this.orderIndex = this.listOrders.length - 1;
        } else {
            if (order.customer != '') {
                let customer = this.listCustomers.find(cus => cus.id === order.customer);
                this.customerName = customer.fullname;
            } else {
                this.customerName = '';
            }
        }
        this.order = order
        this.quantityDetail = [];
        this.order.orderDetail.forEach(orderDetail => this.quantityDetail.push(orderDetail.quantity));
    }

    pushDataToLocalStorage(item: any) {
        // let ordersLocal = localStorage.getItem('order');
        // if (ordersLocal === null) {
        //     let orders: any = [];
        //     let order: any = {};
        //     order.id = this.tabs[this.selected.value];
        //     order.totalPrice = item.detail.quantity * item.detail.price;
        //     order.totalQuantity = item.detail.quantity;
        //     order.note = '';
        //     order.orderDetail = [];
        //     order.orderDetail.push(item.detail);
        //     orders.push(order);
        //     this.order = order;
        //     this.listOrders = orders;
        //     this.setOrderLocalStorage(orders);
        // } else {
        //     let orderLocalArray = JSON.parse(ordersLocal);
        let orderLocalArray = this.listOrders;
        let orderIndex = orderLocalArray.findIndex(o => o.id == this.tabs[this.selected.value]);
        let order = orderLocalArray[orderIndex];
        if (order === null || order === undefined) {
            let order: any = {};
            order.id = this.tabs[this.selected.value];
            order.totalPrice = item.detail.quantity * item.detail.price;
            order.totalQuantity = item.detail.quantity;
            order.note = '';
            order.customer = ''
            order.orderDetail = [];
            order.orderDetail.push(item.detail);
            this.order = order;
            orderLocalArray.push(order);
        } else {
            let orderDetailIndex = order.orderDetail.findIndex(o => o.id === item.detail.id);
            let orderDetail = order.orderDetail[orderDetailIndex];
            if (orderDetail === null || orderDetail === undefined) {
                order.orderDetail.push(item.detail);
                order.totalPrice += item.detail.quantity * item.detail.price;
                order.totalQuantity += item.detail.quantity;
            } else {
                orderDetail.quantity += item.detail.quantity; //40
                orderDetail.quantityInventory = item.detail.quantityInventory;
                if (orderDetail.quantity > item.detail.quantityInventory) {
                    order.totalQuantity += (item.detail.quantity - (orderDetail.quantity - item.detail.quantityInventory));
                    order.totalPrice += (item.detail.quantity - (orderDetail.quantity - item.detail.quantityInventory)) * item.detail.price;
                    orderDetail.quantity = item.detail.quantityInventory;
                } else {
                    order.totalQuantity += item.detail.quantity;
                    order.totalPrice += item.detail.quantity * item.detail.price;
                }

            }
            // order.orderDetail[orderDetailIndex] = orderDetail;
            // orderLocalArray[orderIndex] = order;
            this.order = order;
            this.quantityDetail.push(item.detail.quantity);
            // }
            this.setOrderLocalStorage(orderLocalArray);
            this.listOrders = orderLocalArray;
        }
    }

    focusOutItem(index) {
        let element = document.getElementById(`note_${index}`);
        if (this.noteDetail[index] == null || this.noteDetail[index] == '') {
            element.style.display = 'none';
        } else {
            element.style.display = 'block';
        }
    }

    old_index = 1;
    date;

    setOrderLocalStorage(item: any) {
        localStorage.setItem('order', JSON.stringify(item));
    }

    minusQuantity(index) {
        let orderDetail = this.order.orderDetail[index];
        if (orderDetail.quantity > 1) {
            orderDetail.quantity -= 1;
            this.order.orderDetail[index] = orderDetail;
            this.order.totalQuantity -= 1;
            this.order.totalPrice -= orderDetail.price;
        }
        this.quantityDetail[index] = this.order.orderDetail[index].quantity;
        this.setOrderLocalStorage(this.listOrders);
    }

    plusQuantity(index) {
        let orderDetail = this.order.orderDetail[index];
        if (orderDetail.quantity < orderDetail.quantityInventory) {
            orderDetail.quantity += 1;
            this.order.orderDetail[index] = orderDetail;
            this.order.totalQuantity += 1;
            this.order.totalPrice += orderDetail.price;
        }
        this.quantityDetail[index] = this.order.orderDetail[index].quantity;
        this.setOrderLocalStorage(this.listOrders);
    }

    checkQuantityInput(index) {
        let pattern = /^[0-9]*$/
        if (this.quantityDetail[index] == '') {
            return;
        }
        if (!isNaN(this.quantityDetail[index])) {
            this.order.orderDetail[index].quantity = parseInt(this.quantityDetail[index]);
            if (this.order.orderDetail[index].quantity > this.order.orderDetail[index].quantityInventory) {
                this.order.orderDetail[index].quantity = this.order.orderDetail[index].quantityInventory;
            }
        } else {
            this.quantityDetail[index] = 1;
        }
        this.quantityDetail[index] = this.order.orderDetail[index].quantity;
        var totalPrice: number = 0;
        var totalQuantity: number = 0;
        this.order.orderDetail.forEach(orderDt => {
            totalPrice += orderDt.price * orderDt.quantity;
            totalQuantity += orderDt.quantity;
        });
        this.order.totalQuantity = totalQuantity;
        this.order.totalPrice = totalPrice;

    }

    debounce(fn, ms) {
        let timer;
        return function () {
            // Nhận các đối số
            const args = arguments;
            const context = this;

            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(() => {
                fn.apply(context, args);
            }, ms)
        }
    }

    load() {
        document.getElementById('noteOrder').addEventListener("keyup", this.debounce((event) => {
            this.setOrderLocalStorage(this.listOrders);
            console.log(123);
        }, 2000));

    }


    blurQuantityInput(index) {
        if (this.quantityDetail[index] == '') {
            this.quantityDetail[index] = this.order.orderDetail[index].quantity;
        }
    }

    deleteDetail(index) {
        this.order.orderDetail.splice(index, 1);
    }

    ngOnDestroy() {
        this.setOrderLocalStorage(this.listOrders);
    }

    customerFilter() {
        this.filteredCustomer = this.customerInput.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
        );
    }

    _filter(value: any): any[] {
        var filterValue;
        if (isNaN(value)) {
            filterValue = value.toLowerCase();
        } else {
            filterValue = value;
        }
        return this.listCustomers.filter(option => option.fullname.toLowerCase().includes(filterValue)
            || option.email.toLowerCase().includes(filterValue)
            || option.phone.toLowerCase().includes(filterValue));
    }

    deleteCustomer() {
        this.order.customer = '';
        this.customerInput.setValue('');
        this.customerName = '';
        this.setOrderLocalStorage(this.listOrders);
    }

    chooseCustomer() {
        this.customerName = '';
        let customer = this.listCustomers.find(cus => cus.id == this.customerInput.value);
        this.order.customer = customer.id
        this.customerName = customer.fullname;
        this.customerInput.setValue('');
        this.setOrderLocalStorage(this.listOrders);
    }

    openDialogAddKh() {
        this.dialog.open(CustomerFormComponent, {
            width: '1000px',
            disableClose: true,
            hasBackdrop: true,
            data: {
                type: Constant.TYPE_DIALOG.NEW
            }
        }).afterClosed().subscribe(result => {
            // this.customerService.response.subscribe(data=>console.log(data))
            this.getListCustomer();
        })
    }

    openModalfocus() {
        this.openModal = true;
    }

    closeModal() {
        this.openModal = false;
    }

    tinhtien() {
        var total = this.order.totalPrice;
        if (total % 1000 != 0) {
            total = Math.ceil(total / 1000) * 1000;
            this.listTien.push(total);
        }
        if (total % 5000 != 0) {
            total = Math.ceil(total / 5000) * 5000;
            this.listTien.push(total);
        }
        if (total % 10000 != 0) {
            total = Math.ceil(total / 10000) * 10000;
            this.listTien.push(total);
        }
        if (total % 20000 != 0) {
            total = Math.ceil(total / 20000) * 20000;
            this.listTien.push(total);
        }
        if (total % 50000 != 0) {
            total = Math.ceil(total / 50000) * 50000;
            this.listTien.push(total);
        }
        if (total % 100000 != 0) {
            total = Math.ceil(total / 100000) * 100000;
            this.listTien.push(total);
            if (total % 500000 == 0){
                return;
            }
        }
        if (total % 200000 != 0) {
            total = Math.ceil(total / 200000) * 200000;
            this.listTien.push(total);
        }
        if (total % 500000 != 0) {
            total = Math.ceil(total / 500000) * 500000;
            this.listTien.push(total);
        }
        console.log(this.listTien);
    }
}

