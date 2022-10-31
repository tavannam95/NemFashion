import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {RatingComponent} from "../rating/rating.component";

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrls: ['./user-order.component.css']
})
export class UserOrderComponent implements OnInit {

  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  OnpenRating() {
     this.dialog.open( RatingComponent , {
       width: '60vw' ,
       disableClose: true,
       hasBackdrop: true,
     })
  }

}
