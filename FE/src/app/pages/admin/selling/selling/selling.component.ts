import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";
import {SellingService} from "../../../../shared/service/selling/selling.service";
import {MatDialog} from "@angular/material/dialog";
import {ProductDetailOrderComponent} from "./product-detail-order/product-detail-order.component";
import {Constant} from "../../../../shared/constants/Constant";
import {btoa} from "buffer";

@Component({
    selector: 'selling',
    templateUrl: './selling.component.html',
    styleUrls: ['./selling.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SellingComponent implements OnInit {

    constructor(private sellingService: SellingService,
                private dialog: MatDialog) {
    }

    isLoading: boolean;
    listCate;
    listProduct: any;
    tabFocus: any;
    order: any = {};
    orderIndex: any;
    listOrders:any;
    noteDetail:any = [];
    ngOnInit(): void {
        this.getListCate();
        this.getItemLocalStorage();
        this.getItemByTabs();
    }


    over = 'over';
    showFiller = false;
    tabs = [];
    selected = new FormControl(0);

    addTab(selectAfterAdding: boolean) {
        debugger;
        if (this.tabs.length < 20) {
            this.tabs.push(this.tabs[this.tabs.length - 1] + 1);
            this.selected.setValue(this.tabs.length -  1);
        }
    }

    removeTab(index: number) {
        if (this.tabs.length > 1) {
            this.tabs.splice(index, 1);
            this.listOrders.splice(index,1);
            this.setOrderLocalStorage(this.listOrders);
        } else {
            this.tabs = [];
            localStorage.removeItem('order');
            this.getItemLocalStorage();
            this.getItemByTabs();
        }
    }

    getListCate() {
        this.isLoading = true;
        this.sellingService.getAllCategories().subscribe(
            resp => {
                this.isLoading = false;
                this.listCate = resp;
                console.log(this.listCate)
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
                hd.detail = {
                    id: value.id,
                    price: value.price,
                    quantity: value.quantityOrder,
                    quantityInventory: value.quantityInventory,
                    colorId: value.colorId,
                    colorCode: value.nameColor,
                    sizeId: value.sizeId,
                    sizeCode: value.nameSize    ,
                    name: value.productName,
                    note: ''
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
        if (orders === null ){
            this.tabs.push(1);
        } else{
            orders.forEach(order => {this.tabs.push((order.id))});
        }
        this.listOrders = orders;
    }

    getItemByTabs(){
        if (this.listOrders === null) {
            let orders: any = [];
            let order: any = {};
            order.id = this.tabs[this.tabs.length - 1];
            order.totalPrice = 0
            order.totalQuantity = 0
            order.note = '';
            order.orderDetail = [];
            orders.push(order);
            this.order = order;
            this.setOrderLocalStorage(orders);
            this.listOrders = orders;
            return;
        }
        this.orderIndex = this.listOrders.findIndex(o => o.id == this.tabs[this.selected.value]);
        let order = this.listOrders[this.orderIndex];
        if (order === null || order === undefined){
            order = {};
            order.id = this.tabs[this.tabs.length - 1];
            order.totalPrice = 0;
            order.totalQuantity = 0;
            order.note = '';
            order.orderDetail = [];
            this.listOrders.push(order);
            this.setOrderLocalStorage(this.listOrders);
            this.orderIndex = this.listOrders.length - 1;
        }
        this.order = order
    }

    pushDataToLocalStorage(item: any) {
        let ordersLocal = localStorage.getItem('order');
        if (ordersLocal === null) {
            let orders: any = [];
            let order: any = {};
            order.id = this.tabs[this.selected.value];
            order.totalPrice = item.detail.quantity * item.detail.price;
            order.totalQuantity = item.detail.quantity;
            order.note = '';
            order.orderDetail = [];
            order.orderDetail.push(item.detail);
            orders.push(order);
            this.order = order;
            this.listOrders = orders;
            this.setOrderLocalStorage(orders);
        } else {
            let orderLocalArray = JSON.parse(ordersLocal);
            let orderIndex = orderLocalArray.findIndex(o => o.id == this.tabs[this.selected.value]);
            let order = orderLocalArray[orderIndex];
            if (order === null || order === undefined) {
                let order: any = {};
                order.id = this.tabs[this.selected.value];
                order.totalPrice = item.detail.quantity * item.detail.price;;
                order.totalQuantity = item.detail.quantity;
                order.note = '';
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
                    }else{
                        order.totalQuantity += item.detail.quantity;
                        order.totalPrice += item.detail.quantity * item.detail.price;
                    }

                }
                order.orderDetail[orderDetailIndex] = orderDetail;
                orderLocalArray[orderIndex] = order;
                this.order = order;
            }
            this.setOrderLocalStorage(orderLocalArray);
            this.listOrders = orderLocalArray;
        }
    }

    focusOutItem(index){
        let element = document.getElementById(`note_${index}`);
        if (this.noteDetail[index] == null || this.noteDetail[index] == '') {
            element.style.display = 'none';
        }else{
            element.style.display = 'block';
        }

    }

    old_index = 1;
    date;

    setOrderLocalStorage(item:any){
        localStorage.setItem('order', JSON.stringify(item));
    }

    // setDate() {
    //     let day = new Date().getDay();
    //     let month = new Date().getMonth() + 1;
    //     let year = new Date().getFullYear();
    //     let hours = new Date().getHours();
    //     let minutes = new Date().getMinutes();
    //     this.date = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes;
    //     console.log(this.date)
    // }
    //
    //
    // getTime() {
    //     console.log(this.date);
    //     setInterval(this.setDate, 60000);
    //
    // }
}
