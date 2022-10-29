import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../shared/service/product-service/product.service";
import {BehaviorSubject} from "rxjs";
import {NgForm} from "@angular/forms";
import {ProductDetailService} from "../../../shared/service/product-detail-service/product-detail.service";
import {ColorService} from "../../../shared/service/color-service/color.service";
import {SizeService} from "../../../shared/service/size-service/size.service";
import {CartService} from "../../../shared/service/cart-service/cart-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  productId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  totalQuantity: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  test: any = ''
  product: any;
  productImage: any;
  thumnail: string = '';
  carts: any[] = [];

  sizeDescription: string = '';
  colorDescription: string = '';
  sizeModel: any;
  colorModel: any;
  countProductDetail!: number;
  disabledInput: boolean = false;
  total: any;
  productDetail: any[] = [];
  productQuantity: any;
  message!: string;

  constructor(private route: ActivatedRoute,
              private ServicePro: ProductService,
              private readonly productDetailService: ProductDetailService,
              private readonly colorService: ColorService,
              private readonly sizeService: SizeService,
              private readonly cartService: CartService,
              private readonly toastService: ToastrService) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = Number(routeParams.get('id'));
    this.getProductById(productIdFromRoute);
    this.totalQuantity.subscribe(res => {
      if (res > 0) {
        this.total = res;
      }
    })
    this.productQuantity = 1;
    this.findAllByCustomerId(33);
  }

  getProductById(productIdFromRoute: number) {
    this.ServicePro.getProductById(productIdFromRoute).subscribe(value => {
      if (value) {
        this.thumnail = value.thumnail;
        this.product = value;
        this.productId.next(value.id);

        this.getProductImageById(value.id);
        this.getProductDetailByProductId(value.id);
      }
    })
  }

  getProductImageById(productId: number) {
    this.ServicePro.getProductImageById(productId).subscribe(value => {
      this.productImage = value;
    })
  }

  listColor: any = [];
  listSize: any = [];
  size: any = [];
  color: any = [];

  getProductDetailByProductId(productId: number) {
    let mapSize = new Map();
    let mapColor = new Map();
    this.productDetailService.getProductDetailByProductId(productId).subscribe({
      next: (res: any) => {
        this.productDetail = res;
        this.productDetail.forEach(p => {
          mapSize.set(p.size.id, p.size.code);
          mapColor.set(p.color.id, {name: p.color.name, code: p.color.code});
        })
        mapSize.forEach((v, k) => {
          this.listSize.push({id: k, code: v})
        })
        mapColor.forEach((v, k) => {
          this.listColor.push({id: k, code: v})
        })
        this.listSize = this.listSize.sort((a: { id: number; }, b: { id: number; }) => a.id - b.id);
        this.sizeDescription = this.listSize.map((s: any) => s.code).join(", ");
        this.colorDescription = this.listColor.map((c: any) => c.code.name).join(", ");
        this.totalQuantity.next(res.map((p: any) => p.quantity).reduce((value: any, total: any) => value + total, 0))
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  changThumnail(img: string) {
    this.thumnail = img;
  }

  onClickColor(id: any) {
    console.log(id)
    if (this.listColor.click === undefined || this.listColor.click != id) {
      this.size = this.productDetail.filter(p => p.color.id === id && p.quantity > 0).map(p => p.size.id);
      this.listColor.click = id;
      console.log(this.size)
    } else {
      this.listColor.click = undefined;
      this.size = [];
    }
  }

  onClickSize(id: any) {
    console.log(id)
    if (this.listSize.click === undefined || this.listSize.click != id) {
      this.color = this.productDetail.filter(p => p.size.id === id && p.quantity > 0).map(p => p.color.id);
      this.listSize.click = id;
      console.log(this.color)
    } else {
      this.listSize.click = undefined;
      this.color = [];
    }
  }


  onClickProductDetail() {
    this.productQuantity = 1;
    let pid = 0;
    this.productId.subscribe((id: number) => {
      pid = id;
    })

    if (this.sizeModel !== undefined && this.colorModel !== undefined) {
      this.productDetailService.getProductDetailByProductId(pid).subscribe({
        next: (res: any) => {
          res = res.filter((p: any) => p.color.id === this.colorModel && p.size.id === this.sizeModel && p.product.id === pid)
            .map((p: any) => p.quantity)
          this.countProductDetail = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {

    }
  }

  onAddToCart(f: NgForm) {
    let pid = 0;
    this.productId.subscribe((id: number) => {
      if (id) {
        pid = id;
      }
    })

    const data = {
      productId: pid,
      sizeId: this.listSize.click,
      colorId: this.listColor.click
    }
    console.log(data.sizeId, data.colorId)
    if (this.listColor.click === undefined || this.listSize.click === undefined) {
      this.message = 'Vui lòng chọn màu sắc và size';
      return;
    } else {
      this.message = ''
    }

    this.productDetailService.findProductDetailBySizeAndColor(data).subscribe((res: any) => {
      if (this.productQuantity > res.quantity || this.productQuantity <= 0 || isNaN(this.productQuantity)) {
        this.productQuantity = 1;
        this.message = 'Số lượng không hợp lệ. Vui lòng nhập lại !';
        return;
      }

      if (this.carts.length > 0) {
        for (const c of this.carts) {
          if (c.productsDetail.id == res.id && (parseInt(c.quantity) + parseInt(this.productQuantity)) > res.quantity) {
            this.toastService.warning("Sản phẩm còn lại không đủ !");
            return;
          }
        }
      }

      const cart = {
        quantity: f.value.quantity,
        customer: {
          id: 33
        },
        productsDetail: {
          id: res.id
        }
      }

      this.cartService.addToCart(cart).subscribe(data => {
        if (data) {
          this.findAllByCustomerId(33);
          console.log("Add")
          this.toastService.success("Thêm sản phẩm vào giỏ hàng thành công !")
          this.cartService.isReload.next(false)
        } else {
          this.toastService.error("Thêm sản phẩm vào giỏ hàng thất bại !")
        }
      })

    })
  }

  findAllByCustomerId(customerId: number) {
    this.cartService.findAllByCustomerId(customerId).subscribe(res => {
      this.carts = res as any[];
      console.log("findAllByCustomerId", this.carts)
    })
  }

  onChangeInput(event: any) {
    this.productQuantity = event.target.value;
  }
}
