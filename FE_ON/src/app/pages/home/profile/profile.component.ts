import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../shared/service/order/order.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  countAll = 0 ;
  countCancel = 0 ;
  listOrder: any[] = [] ;
  checkColor = 1 ;

  constructor( private orderService: OrderService ) {
  }

  getAllOrder(){
    this.orderService.getAllOrder(33).subscribe( data => {
        this.listOrder =  data as any[] ;
        this.countAll = this.listOrder.length ;
        this.countOrder() ;
    })
  }

  countOrder(){
      for( let x of this.listOrder ){
          if( x.status == 4 ){
            console.log(x.status)
              this.countCancel += 1;
          }
      }
  }

  ngOnInit(): void {
    this.getAllOrder() ;
  }



}
