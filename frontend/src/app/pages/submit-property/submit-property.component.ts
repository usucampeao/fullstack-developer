/// <reference types="@types/googlemaps" />
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone,
} from '@angular/core';

import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import cep from 'cep-promise';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-submit-property',
  templateUrl: './submit-property.component.html',
  styleUrls: ['./submit-property.component.scss'],
})
export class SubmitPropertyComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  @ViewChild('addressAutocomplete') addressAutocomplete: ElementRef;
  public submitForm: FormGroup;
  public features = [];
  public propertyTypes = [];
  public propertyStatuses = [];
  public cities = [];
  public neighborhoods = [];
  public lat: number = 40.678178;
  public lng: number = -73.944158;
  public zoom: number = 12;
  public photo: File;

  constructor(public appService: AppService, private fb: FormBuilder) {}
  basePath = '/images';
  downloadableURL = '';

  ngOnInit() {
    this.propertyTypes = this.appService.getPropertyTypes();
    this.propertyStatuses = this.appService.getPropertyStatuses();

    this.submitForm = this.fb.group({
      basic: this.fb.group({
        title: [null, Validators.required],
        desc: null,
        priceReal: null,
        propertyType: [null, Validators.required],
        propertyStatus: null,
        gallery: [null, Validators.required],
      }),
      address: this.fb.group({
        location: ['', Validators.required],
        city: ['', Validators.required],
        zipCode: '',
        neighborhood: '',
        state: '',
        street: '',
        complement: '',
        number: ['', Validators.required],
      }),
      additional: this.fb.group({
        bedrooms: '',
        bathrooms: '',
        garages: '',
        area: '',
        yearBuilt: '',
      }),
    });
  }

  async onFileChanged(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`; // path em que a imagem será armazenada
    }
  }

  async touchFindCep() {
    const cepSended = this.submitForm.value.address.zipCode.toString();
    if (cepSended.length === 8) {
      await cep(cepSended).then((res) => {
        if (res) {
          this.patchAddress(res);
        } else {
          console.log('tivemos um erro ');
        }
      });
    }
  }

  patchAddress(values: any) {
    this.submitForm.controls.address.get('location').setValue(values.street);
    this.submitForm.controls.address.get('city').setValue(values.city);
    this.submitForm.controls.address
      .get('neighborhood')
      .setValue(values.neighborhood);
    this.submitForm.controls.address.get('state').setValue(values.state);
    this.submitForm.controls.address
      .get('complement')
      .setValue(values.complement);
  }

  public onSelectionChange(e: any) {
    if (e.selectedIndex == 3) {
      this.horizontalStepper._steps.forEach((step) => (step.editable = false));
      console.log('this.submitForm.value', this.submitForm.value);
      this.photo = this.submitForm.value.basic.gallery[0].file;

      const dados = {
        area: this.submitForm.value.additional.area,
        banheiros: this.submitForm.value.additional.bathrooms,
        quartos: this.submitForm.value.additional.bedrooms,
        garagens: this.submitForm.value.additional.garages,
        ano: this.submitForm.value.additional.yearBuilt,
        cidade: this.submitForm.value.address.city,
        complemento: this.submitForm.value.address.complement,
        logradouro: this.submitForm.value.address.location,
        bairro: this.submitForm.value.address.neighborhood,
        estado: this.submitForm.value.address.state,
        cep: this.submitForm.value.address.zipCode,
        numero: this.submitForm.value.address.number,
        idtipo: this.submitForm.value.basic.propertyType.id,
        tipo: this.submitForm.value.basic.propertyType.name,
        idstatus: this.submitForm.value.basic.propertyStatus.id,
        status: this.submitForm.value.basic.propertyStatus.name,
        titulo: this.submitForm.value.basic.title,
        valor: this.submitForm.value.basic.priceReal,
        descricao: this.submitForm.value.basic.desc,
      };
      this.appService
        .changeProperties(dados, this.photo, 'add')
        .subscribe((res) => {
          console.log(res);
        });
    }
  }

  public reset(){
    this.horizontalStepper.reset(); 

  this.setAddresses();
     
    this.submitForm.reset();   
     
  }


  public setAddresses() {
    this.submitForm.controls.address.get('city').setValue(null);
    this.submitForm.controls.address.get('zipCode').setValue(null);
    this.submitForm.controls.address.get('state').setValue(null);
    this.submitForm.controls.address.get('location').setValue(null);
    this.submitForm.controls.address.get('complement').setValue(null);
    this.submitForm.controls.address.get('number').setValue(null);
    this.submitForm.controls.address.get('neighborhood').setValue(null);

  }
}
