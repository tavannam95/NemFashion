import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../shared/service/storage.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public readonly storageService: StorageService,
              private readonly router: Router,
              private readonly toastService: ToastrService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.storageService.clearToken();
    this.toastService.success("Đăng xuất thành công !")
    this.router.navigate(["/home"]).then(() => this.storageService.reloadPage())
  }
}
