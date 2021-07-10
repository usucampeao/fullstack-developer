import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImmobileService } from 'src/app/shared/service/immobile.service';

@Component({
  selector: 'app-immobile-form-dialog',
  templateUrl: './immobile-form-dialog.component.html',
  styleUrls: ['./immobile-form-dialog.component.scss']
})
export class ImmobileFormDialogComponent implements OnInit {

  public immobileForm!: FormGroup;
  private msgError!: string;
  loading: boolean;

  constructor(
    private fb: FormBuilder,
    private immobileService: ImmobileService,
    public dialogRef: MatDialogRef<ImmobileFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.loading = false;
  }

  ngOnInit(): void {
    if(!this.data){
      this.immobileForm = this.fb.group({
        title: ['', [Validators.required, Validators.maxLength(244)]],
        description: ['', [Validators.required]],
        amount: ['', [Validators.required]],
        area: ['', [Validators.required]],
        address: ['', [Validators.required]],
        addressNumber: ['', [Validators.required]],
        complement: ['', [Validators.required]],
        district: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zipCode: ['', [Validators.required]]
      });
    } else {
      this.immobileForm = this.fb.group({
        id: [this.data.id],
        title: [this.data.title, [Validators.required, Validators.maxLength(244)]],
        description: [this.data.description, [Validators.required]],
        amount: [this.data.amount, [Validators.required]],
        area: [this.data.area, [Validators.required]],
        address: [this.data.address, [Validators.required]],
        addressNumber: [this.data.address_number, [Validators.required]],
        complement: [this.data.complement, [Validators.required]],
        district: [this.data.district, [Validators.required]],
        city: [this.data.city, [Validators.required]],
        state: [this.data.state, [Validators.required]],
        zipCode: [this.data.zip_code, [Validators.required]]
      });
    }
  }

  searchAddress() {
    this.loading = true;
    let dataForm = this.immobileForm.value;
    const zCode = dataForm.zipCode.replace('-','').replace('.','');
    this.immobileService.getSearchAddress(zCode).subscribe(data => {
      dataForm.address = data.logradouro;
      dataForm.district = data.bairro;
      dataForm.city = data.localidade;
      dataForm.state = data.uf;
      dataForm.zipCode = data.cep;
      this.immobileForm.setValue(dataForm);
      this.loading = false;
    })
  }

  saveImmobile() {
    if(this.immobileForm.value.zipCode.indexOf('-') == -1){
      let dataForm = this.immobileForm.value;
      let begin = dataForm.zipCode.substr(0,5);
      let end = dataForm.zipCode.substr(5,3);
      dataForm.zipCode = begin + '-' + end;
      console.log(dataForm.zipCode);
      this.immobileForm.setValue(dataForm);
    }

    if(this.immobileForm.value.id !== undefined){
      this.immobileService.putImmobiles(this.immobileForm.value.id, this.immobileForm.value).subscribe(result => {
        this.dialogRef.close();
        this.immobileForm.reset();
      }, error => {
        this.msgError = 'Ocorreu um erro ao editar o registro.'
      });
    }else {
      this.immobileService.postImmobiles(this.immobileForm.value).subscribe(result => {
        this.dialogRef.close();
        this.immobileForm.reset();
      }, error => {
        this.msgError = 'Ocorreu um erro ao registrar o imóvel.'
      });
    }
    
  }

  close(): void {
    this.dialogRef.close();
    this.immobileForm.reset();
  }

}
