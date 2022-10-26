import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductService} from "../../../shared/service/product-service/product.service";
import {HomeComponent} from "../home/home.component";
import {ProductViewComponent} from "../home/product-view/product-view.component";
import {MatDialog} from "@angular/material/dialog";
import {SizeService} from "../../../shared/service/size/size.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  listPro: any;
  listSize: any;
  listProBySize = [];

  constructor(private proService: ProductService,
              private sizeService: SizeService,
              private dialog: MatDialog) {
    this.getAllProSize();
    this.getAllPro();
  }

  getAllPro() {
    this.proService.getAllProduct().subscribe(data => {
      this.listPro = data
    })
  }

  getAllProSize() {
    this.sizeService.getAllSize().subscribe(data => {
      this.listSize = data;
      console.log(data)
    })
  }

  getAllProBySize(size: any) {
    this.proService.getAllProBySize(size).subscribe(data => {
      this.listPro = data;
    })
  }

  ngOnInit(): void {

  }

  OpenProductView(product: any) {
    const dialogRef = this.dialog.open(ProductViewComponent, {
      width: '70vw',
      disableClose: true,
      hasBackdrop: true,
      data: {
        product: product,
        type: 'pro'
      }
    })

    dialogRef.afterClosed().subscribe(value => {

    })
  }

  getAllBySize(size: number) {
    // @ts-ignore
    if (this.listProBySize.includes(size)) {
      // @ts-ignore
      this.listProBySize.splice(this.listProBySize.indexOf(size), 1)
    } else {
      // @ts-ignore
      this.listProBySize.push(size)
    }

    if (this.listProBySize.length == 0) {
      console.log('meo co gia tri')
      this.getAllPro();
    } else {
      this.getAllProBySize(this.listProBySize);
    }
    console.log(this.listProBySize)
  }
}
