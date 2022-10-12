import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../shared/service/auth/auth.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    hide: boolean = true;

    formGroup = this.fb.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
    })

    constructor(private readonly fb: FormBuilder,
                private readonly authService: AuthService) {
    }

    ngOnInit(): void {
    }

}
