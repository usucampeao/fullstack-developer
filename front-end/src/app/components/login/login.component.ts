import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '@app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup;
    public waiting: boolean;
    public hidePassword: boolean;

    constructor(
        private router: Router,
        private fb: FormBuilder,
        private authService: AuthService
    ) {
        this.hidePassword = true;
    }

    ngOnInit() {
            this.loginForm = this.fb.group({
                email: [null, [Validators.required]],
                password: [null, [Validators.required]],
            });

    }

    get form() { return this.loginForm.controls; }

    public onSubmit(): void {
        if (this.loginForm.valid) {
            //this.waiting = true;
            this.authService.login(this.form.email.value, this.form.password.value);
            this.router.navigateByUrl('consulta/imoveis');
        }
    }
}
