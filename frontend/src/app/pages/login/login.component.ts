import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AutenticacaoService } from 'src/app/shared/autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public hide = true;

  constructor(
    public fb: FormBuilder,
    public router: Router,
    public authService: AutenticacaoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      rememberMe: false,
    });
  }

  public onLoginFormSubmit(values: Object): void {
    if (this.loginForm.valid) {
      this.authService
        .auth(this.loginForm.value.username, this.loginForm.value.password)
        .subscribe(
          () => {
            console.log('Autenticado com sucesso');
            this.router.navigate(['/']);
          },
          (error) => {
            this.snackBar.open(
              'Usuário ou Senha estão incorretos, Tente novamente',
              '×',
              {
                verticalPosition: 'top',
                duration: 3000,
              }
            );
            this.loginForm.reset();
            this.router.navigate(['/login']);
          }
        );
    }
  }
}
