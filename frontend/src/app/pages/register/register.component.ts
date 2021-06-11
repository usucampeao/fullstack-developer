import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  matchingPasswords,
  emailValidator,
} from 'src/app/theme/utils/app-validators';
import { UserExistsService } from './user-exists.service';
import { UserServicesService } from '../services/userServices.service';
import { User } from 'src/app/app.models';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public hide = true;
  constructor(
    public fb: FormBuilder,
    public router: Router,
    public snackBar: MatSnackBar,
    //usado para validar se já existe um usuário com o nome digitado
    public userExists: UserExistsService, 
    public userService: UserServicesService
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        fullName: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
        ],
        userName: [
          '',
          Validators.compose([Validators.required, Validators.minLength(6)]),
          this.userExists.userExists(),
        ],
        email: ['', Validators.compose([Validators.required, emailValidator])],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: matchingPasswords('password', 'confirmPassword') }
    );
  }

  public onRegisterFormSubmit(values: Object): void {
    console.log(values);
    if (this.registerForm.valid) {
      const newUser = this.registerForm.getRawValue() as User
      console.log('newuser', newUser)
      this.userService.createNewUser(newUser).subscribe(() => {
      
        this.snackBar.open('Registro feito com Sucesso!', '×', {
          panelClass: 'success',
          verticalPosition: 'top',
          duration: 3000,
        });
        this.router.navigate(['/login'])
      }, 
      (error) => {
        console.log(error);
      }
      );
    }
  }
}
