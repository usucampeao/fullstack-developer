import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PropertiesService } from 'src/app/core/services/properties.service';
import Property from 'src/app/shared/models/property.model';

@Component({
  selector: 'app-new-property',
  templateUrl: './new-property.component.html',
  styleUrls: ['./new-property.component.sass']
})
export class NewPropertyComponent implements OnInit {

  public form: FormGroup;
  public processing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private propertiesSerivce: PropertiesService,
    private router: Router,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.buildForm();
  }

  submitForm() {
    if (this.form.valid) {
      this.processing = true;

      const property: Property = {
        titulo: this.form.value.title,
        descricao: this.form.value.description,
        area: this.form.value.area,
        valor: this.form.value.value,
        endereco: {
          logradouro: this.form.value.address,
          numero: this.form.value.address_number,
          complemento: this.form.value.address_complement,
          bairro: this.form.value.address_district,
          cep: this.form.value.address_zipcode,
          cidade: this.form.value.address_city,
          estado: this.form.value.address_state,
        }
      }

      this.propertiesSerivce.store(property)
        .subscribe(
          success => this.handleSuccess(success),
          error => this.handleError(error)
        )
    }
  }

  private handleSuccess(response) {
    this.notificationService.notify('Imóvel adicionado com sucesso');
    this.router.navigate(['/']);
  }

  private handleError(response) {
    this.processing = false;
    let msg = response.error.message;
    this.notificationService.notify(`Um erro ocorreu: ${msg}`);
  }

  private buildForm(){
    this.form = this.fb.group({
      title: this.fb.control('', [Validators.required]),
      description: this.fb.control('', [Validators.required]),
      area: this.fb.control('', [Validators.required]),
      value: this.fb.control('', [Validators.required]),
      address: this.fb.control('', [Validators.required]),
      address_number: this.fb.control('', [Validators.required]),
      address_complement: this.fb.control('', [Validators.required]),
      address_district: this.fb.control('', [Validators.required]),
      address_zipcode: this.fb.control('', [Validators.required]),
      address_city: this.fb.control('', [Validators.required]),
      address_state: this.fb.control('', [Validators.required]),
    });
  }
}
