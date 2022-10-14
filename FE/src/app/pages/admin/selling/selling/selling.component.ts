import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
    selector: 'selling',
    templateUrl: './selling.component.html',
    styleUrls: ['./selling.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class SellingComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
    }

    over = 'over';

    showFiller = false;

    tabs = ['First', 'Second', 'Third'];
    selected = new FormControl(0);

    addTab(selectAfterAdding: boolean) {
        this.tabs.push('New ${<a>x</a>}');
        this.selected.setValue(this.tabs.length - 1);
    }

    removeTab(index: number) {
        if (this.tabs.length > 1) {
            this.tabs.splice(index, 1);
        }
    }

    list = ['Quần', 'Áo', 'Váy', 'Áo khoác', 'Đầm', 'Mũ', 'Tất', 'Giày', 'Quần', 'Áo', 'Váy', 'Áo khoác', 'Đầm', 'Mũ', 'Tất', 'Giày', 'Quần', 'Áo', 'Váy', 'Áo khoác', 'Đầm', 'Mũ', 'Tất', 'Giày'];
    listProduct = [
        {
            cate: 'Quần',
            product: [{
                name: 'Quần đỉnh cao quá',
                price: '18000',
                quantity: '5',

            },
                {
                    name: 'Quần đỉnh thấp',
                    price: '20000',
                    quantity: '2',
                },
                {
                    name: 'Quần đỉnh thấp',
                    price: '20000',
                    quantity: '2',
                },
                {
                    name: 'Quần đỉnh thấp',
                    price: '20000',
                    quantity: '2',
                },
                {
                    name: 'Quần đỉnh thấp',
                    price: '20000',
                    quantity: '2',
                },
                {
                    name: 'Quần đỉnh thấp',
                    price: '20000',
                    quantity: '2',
                }]
        }
    ]

    listProductfill: any;

    fillProduct(id: any) {
        this.listProductfill = this.listProduct[id].product;
    }

    old_index = 1;
    date;

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
