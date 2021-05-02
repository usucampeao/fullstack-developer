import { ServiceService } from './../home/service.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-prop',
  templateUrl: './add-prop.component.html',
  styleUrls: ['./add-prop.component.scss']
})
export class AddPropComponent implements OnInit {

  form: FormGroup;
  statusBT = false;
  checked = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private sevice: ServiceService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: [''],
      description: [''],
      value: [''],
      area: [''],
      postal_code: [''],
      uf: [''],
      public_place: [''],
      number: [''],
      complement: [''],
      district: [''],
      city: [''],
    });

    this.form.controls.postal_code.valueChanges.subscribe((data)=>{
      const text: string = data;
      if (text.length === 8) {
        this.gepCEP(text);
      }
    });
  }

  onClickPriv($event) {
    console.log('$event', $event);

  }

  addProps() {
    this.statusBT = true;
    this.http.post(`${this.sevice.apiURL}/addImmobile`, this.form.value).subscribe(()=>{

    }, error => {
      this.statusBT =false;
      console.log(error.error);
      this.sevice.showMessage(error.error.message, 'Entendi');
    });
  }

  gepCEP(cep: any) {
    this.http.get(this.sevice.getCEPdata(cep), this.form.value).subscribe((response: any) =>{
      this.form.controls.city.setValue(response.localidade);
      this.form.controls.public_place.setValue(response.logradouro);
      this.form.controls.uf.setValue(response.uf);
      this.form.controls.district.setValue(response.bairro);
    }, error => {
      console.log(error.error);
      this.sevice.showMessage('Erro cep', 'OK');
    });
  }



}
