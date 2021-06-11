import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Property } from 'src/app/app.models';
import cep from 'cep-promise';
import { UserServicesService } from '../../services/userServices.service';

@Component({
  selector: 'app-edit-property',
  templateUrl: './edit-property.component.html',
  styleUrls: ['./edit-property.component.scss'],
})
export class EditPropertyComponent implements OnInit {
  @ViewChild('horizontalStepper') horizontalStepper: MatStepper;
  private sub: any;
  public property: Property;
  public submitForm: FormGroup;
  public features = [];
  public propertyTypes = [];
  public propertyStatuses = [];
  public zoom: number = 12;
  public data: any;
  public selectedStatus: string;
  public selectedTipo: string;
  public urlImg: string;
  public photo: File;
  public imovelId: string; 

  constructor(
    public appService: AppService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    public userService: UserServicesService
  ) {}

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
    });

    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.getPropertyById(params['id']);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  async onFileChanged(event) {
    const file = event.target.files[0];
    if (file) {
      const filePath = `${this.basePath}/${file.name}`; // path em que a imagem será armazenada
    }
  }

  public getPropertyById(id) {
    this.imovelId = id; 
    this.appService.getPropertyById(id).subscribe((data) => {
      console.log(data);
      this.property = data;
      this.selectedStatus = this.property.status;
      this.selectedTipo = this.property.tipo;
      this.urlImg = `http://localhost:3000/imgs/${this.property.photo_url}`;
      console.log('status', this.selectedStatus);

      this.submitForm.controls.basic
        .get('title')
        .setValue(this.property.titulo);
      this.submitForm.controls.basic
        .get('desc')
        .setValue(this.property.descricao);
      this.submitForm.controls.basic
        .get('priceReal')
        .setValue(this.property.valor);
      this.submitForm.controls.basic
        .get('propertyType')
        .setValue(this.property.tipo);
      this.submitForm.controls.basic
        .get('propertyStatus')
        .setValue(this.property.status);
      this.submitForm.controls.address
        .get('zipCode')
        .setValue(this.property.cep);
      this.submitForm.controls.address
        .get('location')
        .setValue(this.property.logradouro);
      this.submitForm.controls.address
        .get('number')
        .setValue(this.property.numero);
      this.submitForm.controls.address
        .get('complement')
        .setValue(this.property.complemento);
      this.submitForm.controls.address
        .get('neighborhood')
        .setValue(this.property.bairro);
      this.submitForm.controls.address
        .get('city')
        .setValue(this.property.cidade);
      this.submitForm.controls.address
        .get('state')
        .setValue(this.property.estado);
    });
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
    console.log('select', e.selectedIndex);
    if (e.selectedIndex == 2) {
      this.horizontalStepper._steps.forEach((step) => (step.editable = false));
      console.log('this.submitForm.value', this.submitForm.value);
      if (this.submitForm.value.basic.gallery[0].file) {
        this.photo = this.submitForm.value.basic.gallery[0].file;
      }

      console.log('imovelid', this.imovelId);

      const dados = {
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
        imovelId: this.imovelId, 
      };
      this.appService
        .changeProperties(dados, this.photo, 'update')
        .subscribe((res) => {console.log(res)});
    }
  }

  public setAddresses(result) {
    this.submitForm.controls.address.get('city').setValue(null);
    this.submitForm.controls.address.get('zipCode').setValue(null);
    this.submitForm.controls.address.get('street').setValue(null);
  }

  public reset() {
    this.submitForm.reset();
  }
}
