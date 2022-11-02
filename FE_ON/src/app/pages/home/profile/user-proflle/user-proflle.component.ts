import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {UserProfileImageComponent} from "./user-profile-image/user-profile-image.component";

@Component({
  selector: 'app-user-proflle',
  templateUrl: './user-proflle.component.html',
  styleUrls: ['./user-proflle.component.css']
})
export class UserProflleComponent implements OnInit {

  constructor( private dialog: MatDialog ) { }

  ngOnInit(): void {
  }

  OpenDialogImage(){
      this.dialog.open( UserProfileImageComponent , {
          width: '25vw' ,
        hasBackdrop: true ,
        disableClose: true ,
      })
  }
}
