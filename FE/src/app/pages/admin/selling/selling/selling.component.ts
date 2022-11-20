import {Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
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
import {CurrencyPipe} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {MatDrawer} from "@angular/material/sidenav";
// import printJS = require("print-js");
// @ts-ignore
import printJS from 'print-js';
import {ProductService} from "../../../../shared/service/product/product.service";

@Component({
    selector: 'selling',
    templateUrl: './selling.component.html',
    styleUrls: ['./selling.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SellingComponent implements OnInit, OnDestroy {
    @ViewChild('drawer') drawer: MatDrawer;

    constructor(private sellingService: SellingService,
                private dialog: MatDialog,
                private customerService: CustomerService,
                private currencyPipe: CurrencyPipe,
                private toast: ToastrService,
                private productService: ProductService) {
    }

    options = {prefix: '', thousands: ',', precision: '0', allowNegative: 'false'}
    pattern = /^[0-9]*$/
    discount = 0;
    customerInput = new FormControl('');
    productInput = new FormControl('');
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
    listProducts: any;
    filteredProduct: Observable<any>;
    filteredCustomer: Observable<any>;
    customerName = '';
    listProductSearch: any = [];
    openModal: boolean = false;
    listTien: any = [];
    customerPayment;

    ngOnInit(): void {
        this.getListCate();
        this.getListCustomer();
        this.getAllProduct();
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

    getAllProduct() {
        this.productService.getAllProduct().subscribe({
            next: resp => {
                this.listProductSearch = resp;
                this.productFilter();
            },
            error: error => {

            }
        })
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
        this.productInput.setValue('');
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
        this.discount = 0;
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
            this.quantityDetail.push(item.detail.quantity);
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
                this.quantityDetail.push(item.detail.quantity);
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
                this.quantityDetail[orderDetailIndex] = orderDetail.quantity;

            }
            // order.orderDetail[orderDetailIndex] = orderDetail;
            // orderLocalArray[orderIndex] = order;
            this.order = order;
            // }
            this.setOrderLocalStorage(orderLocalArray);
            this.listOrders = orderLocalArray;
            console.log(this.quantityDetail);
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
        // let pattern = /^[0-9]*$/
        // if (this.quantityDetail[index] == '') {
        //     return;
        // }
        // if (!isNaN(this.quantityDetail[index])) {
            this.order.orderDetail[index].quantity = parseInt(this.quantityDetail[index]);
            if (this.order.orderDetail[index].quantity > this.order.orderDetail[index].quantityInventory) {
                this.order.orderDetail[index].quantity = this.order.orderDetail[index].quantityInventory;
            }
        // } else {
        //     this.quantityDetail[index] = 1;
        // }
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
        }, 2000));

    }


    blurQuantityInput(index) {
        if (this.quantityDetail[index] == '') {
            this.quantityDetail[index] = this.order.orderDetail[index].quantity;
        }
    }

    deleteDetail(index) {
        let oderDetailDelete = this.order.orderDetail.splice(index, 1);
        this.quantityDetail.splice(index,1);
        this.order.totalPrice -= (oderDetailDelete[0].price * oderDetailDelete[0].quantity);
        this.order.totalQuantity -= oderDetailDelete[0].quantity;
        this.setOrderLocalStorage(this.listOrders);
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

    productFilter() {
        this.filteredProduct = this.productInput.valueChanges.pipe(
            startWith(''),
            map(value => this._filterproduct(value || '')),
        );
    }

    _filterproduct(value: any): any[] {
        var filterValue;
        if (isNaN(value)) {
            filterValue = value.toLowerCase();
        } else {
            filterValue = value;
        }
        return this.listProductSearch.filter(option => option.name.toLowerCase().includes(filterValue)
            || option.name.includes(filterValue));
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
        // this.discount = 0;
        this.listTien = [];
        var total = this.order.totalPrice - this.order.totalPrice * this.discount / 100;
        this.customerPayment = total;
        if (this.discount == 100) {
            this.customerPayment = 0;
        }
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
            if (total % 500000 == 0) {
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
    }

    clickPrice(index) {
        this.customerPayment = this.listTien[index];
    }

    focusDiscout() {

    }


    selling() {
        this.order.discount = this.discount;
        this.sellingService.paymentSelling(this.order).subscribe({
                next: resp => {
                    this.drawer.close();
                    // this.print(resp); // Test
                    if (resp.status === 'OK') {
                        this.toast.success("Thành công");
                        this.print(resp.data);
                        this.removeTab(this.selected.value);
                    } else {
                        console.log(resp.data);
                        if (resp.data) {
                            this.toast.error(resp.message);
                            let orderDetail = this.order.orderDetail.find(od => od.id === resp.data.id);
                            orderDetail.quantityInventory = resp.data.quantity;
                        }
                    }
                },
                error: err => {
                    this.toast.error("Lỗi thanh toán");
                }
            }
        )
    }

    print(data) {
        console.log(data);
        let customer = this.listCustomers.find(cus => cus.id == data.customer)
        const formatter = new Intl.NumberFormat();
        let text = '';
        data.orderDetail.forEach(od => {
            text += `<tr>
                            <td ><div>${od.name}</div>
                                <div>${od.quantity}</div></td>
                            <td style="text-align: center">${formatter.format(od.price)}</td>
                            <td style="text-align: end">${formatter.format(od.quantity * od.price)}</td>
                    </tr>`
        })
        // @ts-ignore
        printJS({
            printable: 'demo',
            properties: [{
                field: ' ',
                displayName: ' '
            }],
            documentTitle: 'NemPhaSun',

            type: 'html',
            maxWidth: 826,
            font: 'Thoma',
            font_size: '12pt',
            header: `
                    <div class="custom"> 
                    <h2>NemPhaSun</h2> <h3 >HÓA ĐƠN BÁN HÀNG </h3>
                    </div>
                    <div class="info">
                        <div>Khách hàng: ${customer == undefined ? 'Khách lẻ' : customer.fullname}</div>
                        <div>SĐT: ${customer == undefined ? '--' : customer.phone}</div>
                    </div>
                    <div >
                        <table class="table">
                        <thead>
                            <tr>
                                <th style="text-align: start; width: 50%">Số lượng</th>
                                <th style="width:25%">Đơn giá</th>
                                <th style="text-align: end; width:25%">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${text}     
                        </tbody>
                        </table>
                    </div style="">
                        <table class="total" style="">
                            <thead>
                                <th></th>
                                <th></th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Tổng tiền hàng:</td>
                                    <td>${formatter.format(data.totalPrice)}</td>
                                </tr>
                                <tr>
                                    <td>Chiếu khấu ${data.discount}%:</td>
                                    <td>${formatter.format(data.totalPrice * data.discount / 100)}</td>
                                </tr>
                                <tr>
                                    <td>Tổng thanh toán:</td>
                                    <td>${formatter.format(data.totalPrice - (data.totalPrice * data.discount / 100))}</td>
                                </tr>
                            </tbody>     
                        </table>                    
                    <div style="margin-top: 20px;text-align: center;font-size: 13px">
                        <div>Quý khách vui lòng kiểm tra kỹ hàng</div>
                        <div>--------------------</div>
                        <div>Cảm ơn quý khách, hẹn gặp lại!</div>  
                    </div>
`,
            style: '.custom { text-align: center;font-size:13px;margin:0 }' +
                '.info {margin-top:5px; margin-bot: 10px; font-size:13px}' +
                '.table{width: 100%; font-size: 13px; margin-top: 10px; ' +
                'border-top:2px dashed  black; border-bottom: 2px dashed  black}' +
                '.total{width: 100%; float: right; text-align: end; font-weight: bold;' +
                'font-size: 13px;margin:10px 0px 15px 0px; border-bottom: 2px dashed black;padding-bottom:10px}'
        })
        // printJS(data, 'html')
    }


}

