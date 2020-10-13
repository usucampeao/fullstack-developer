import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { MatConfirmDeleteComponent } from '@app/shared/dialogs/confirm-delete/confirm-delete.component';

@Injectable({
	providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) {

    }

    openConfirmDialog(msg) {
        return this.dialog.open(MatConfirmDeleteComponent,{
            width: '390px',
            panelClass: 'confirm-dialog-container',
            disableClose: true,
            position: { top: "10px" },
            data :{
              message : msg
            }
          });
        }
    }


