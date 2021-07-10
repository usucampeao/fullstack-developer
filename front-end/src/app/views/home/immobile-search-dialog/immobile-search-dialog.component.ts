import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImmobileService } from 'src/app/shared/service/immobile.service';

export interface DialogData {
  state: string, 
  city: string, 
  district: string, 
  address: string
}

@Component({
  selector: 'app-immobile-search-dialog',
  templateUrl: './immobile-search-dialog.component.html',
  styleUrls: ['./immobile-search-dialog.component.scss']
})
export class ImmobileSearchDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImmobileSearchDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
