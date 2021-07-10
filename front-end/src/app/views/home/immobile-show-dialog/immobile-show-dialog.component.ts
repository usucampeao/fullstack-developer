import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImmobileFormDialogComponent } from '../immobile-form-dialog/immobile-form-dialog.component';

@Component({
  selector: 'app-immobile-show-dialog',
  templateUrl: './immobile-show-dialog.component.html',
  styleUrls: ['./immobile-show-dialog.component.scss']
})
export class ImmobileShowDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImmobileShowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    
  }

  close(): void {
    this.dialogRef.close();
  }

}
