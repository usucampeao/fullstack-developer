import { ServiceService } from './../home/service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-prod-item',
  templateUrl: './user-prod-item.component.html',
  styleUrls: ['./user-prod-item.component.scss']
})
export class UserProdItemComponent implements OnInit {

  form: FormGroup;
  statusbt1 = false;
  item = {
    title: '',
    description: '',
    value: '',
    area: '',
    address: {
      postal_code: '',
      uf: '',
      public_place: '',
      number: '',
      complement: '',
      district: '',
      city: '',
    },
  }

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UserProdItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private service: ServiceService) { }

  ngOnInit(): void {

    this.item = this.data;

    console.log(this.data)
    this.form = this.fb.group({
      title: [this.item.title],
      description: [this.item.description],
      value: [this.item.value],
      area: [this.item.area],
      postal_code: [this.item.address.postal_code],
      uf: [this.item.address.uf],
      public_place: [this.item.address.public_place],
      number: [this.item.address.number],
      complement: [this.item.address.complement],
      district: [this.item.address.district],
      city: [this.item.address.city],
    });

  }

  onclickSave() {
    this.statusbt1 = true;
    this.service.updateProp(this.form.value).then((response)=>{
      console.log(response);
      if (!response.erro) {
        this.dialogRef.close(true);
      }
    });
  }

}
