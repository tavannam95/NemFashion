import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../shared/service/product-service/product.service";
import {ProductDetailService} from "../../../shared/service/product-detail-service/product-detail.service";
import {ColorService} from "../../../shared/service/color-service/color.service";
import {SizeService} from "../../../shared/service/size-service/size.service";
import {BehaviorSubject} from "rxjs";
import {NgForm} from "@angular/forms";
import {CartService} from "../../../shared/service/cart-service/cart-service";

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
  sizes: any[] = [];
  colors: any[] = [];
  sizeDescription: string = '';
  colorDescription: string = '';
  sizeModel: any;
  colorModel: any;
  countProductDetail!: number;
  disabledInput: boolean = false;
  total: any;
  productDetail: any[] = [];
  productQuantity: any;

  constructor(private route: ActivatedRoute,
              private ServicePro: ProductService,
              private readonly productDetailService: ProductDetailService,
              private readonly colorService: ColorService,
              private readonly sizeService: SizeService,
              private readonly cartService: CartService) {
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
  }

  slideConfissg = { slidesToShow: 3, slidesToScroll:1  , vertical: true ,draggable: false , infinite: false ,
    nextArrow: ' <button type="button" style="z-index: 3" class="text-white btn btn-dark opacity-50 position-absolute bottom-0 start-50 translate-middle-x"><i class="fas fa-arrow-down"></i></button>' ,
    prevArrow: '<button type="button" style="z-index: 3" class="text-white btn btn-dark opacity-50 position-absolute top-0 start-50 translate-middle-x"><i class="fas fa-arrow-up  "></i></button>'};

  slickInit(e: any) {
    console.log('slick initialized');
  }
  breakpoint(e: any) {
    console.log('breakpoint');
  }
  afterChange(e: any) {
    console.log('afterChange');
  }
  beforeChange(e: any) {
    console.log('beforeChange');
  }


  getProductById(productIdFromRoute: number) {
    this.ServicePro.getProductById(productIdFromRoute).subscribe(value => {
      if (value) {
        this.thumnail = value.thumnail;
        this.product = value;
        this.productId.next(value.id);

        this.getProductImageById(value.id);
        this.getProductDetailByProductId(value.id);

        this.sizeService.findAllSizeInProductDetails(value.id).subscribe(res => {
          this.sizes = res as any[];
          this.sizeDescription = this.sizes.map(s => s.code).join(", ")
        })

        this.colorService.findAllColorInProductDetails(value.id).subscribe(res => {
          this.colors = res as any[];
          this.colorDescription = this.colors.map(c => c.name).join(", ")
        })
      }
    })
  }

  getProductImageById(productId: number) {
    this.ServicePro.getProductImageById(productId).subscribe(value => {
      this.productImage = value;
    })
  }


  getProductDetailByProductId(productId: number) {
    this.productDetailService.getProductDetailByProductId(productId).subscribe({
      next: (res: any) => {
        this.productDetail = res;
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


  onClickProductDetail(id?: any) {
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
          this.countProductDetail = res[0];
          if (this.countProductDetail === undefined) {
            this.disabledInput = true;
            this.test = id;
            console.log('OK')
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  onAddToCart(f: NgForm) {
    let pid = 0;
    this.productId.subscribe((id: number) => {
      pid = id;
    })

    const data = {
      productId: pid,
      sizeId: f.value.size,
      colorId: f.value.color
    }
    if (data.sizeId === undefined || data.colorId === undefined) {
      console.log("Vui lòng chọn màu sắc và size")
      return;
    }
    this.productDetailService.findProductDetailBySizeAndColor(data).subscribe((res: any) => {
      const cart = {
        quantity: f.value.quantity,
        customer: {
          id: 33
        },
        productsDetail: {
          id: res.id
        }
      }
      this.cartService.addToCart(cart);
    })
  }

  findAllByCustomerId(customerId: number) {
    this.cartService.findAllByCustomerId(customerId).subscribe(res => {
      console.log(res)
    })
  }


}
