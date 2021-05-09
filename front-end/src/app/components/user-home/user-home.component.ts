import { UserProdItemComponent } from './../user-prod-item/user-prod-item.component';
import { ServiceService } from './../home/service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.scss']
})
export class UserHomeComponent implements OnInit {

  ELEMENT_DATA = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  ];

  displayedColumns: string[] = [ 'ti', 'end', 'a', 'v', 'dp', 'bt1'];
  dataSource: any;
  statusLoader = false;

  constructor(private service: ServiceService, public dialog: MatDialog) {


  }

  ngOnInit(): void {


    this.statusLoader = true;
    this.service.getPropsProm().then((response: Array<Prop>) => {
      console.log(response);
      this.dataSource = response;
      this.statusLoader = false;

    });

  }

  onClickEdit(item: any) {
    const dialogRef = this.dialog.open(UserProdItemComponent, {
      width: '750px',
      data: item
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  onClickRemove(item: any) {

  }

}

interface Prop {
  address: {
    city: "",
    district: ""
    postal_code: ""
    public_place: ""
  },
  uf: ""
  area: ""
  description: ""
  id: ""
  image: ""
  publication_date: ""
  title: ""
  value: ""
}
