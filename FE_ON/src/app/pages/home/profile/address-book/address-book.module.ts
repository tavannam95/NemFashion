import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddressBookRoutingModule} from "./address-book-routing.module";
import {AddressBookComponent} from "./address-book.component";

@NgModule({
  declarations: [
    AddressBookComponent
  ],
  imports: [
    CommonModule ,
    AddressBookRoutingModule
  ]
})
export class AddressBookModule { }
