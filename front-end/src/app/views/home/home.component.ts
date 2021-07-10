import { Component, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Immobile } from 'src/app/shared/model/immobile.model';
import { Pageable } from 'src/app/shared/model/pageable.model';
import { ImmobileService } from 'src/app/shared/service/immobile.service';
import { ImmobileFormDialogComponent } from './immobile-form-dialog/immobile-form-dialog.component';
import { ImmobileSearchDialogComponent } from './immobile-search-dialog/immobile-search-dialog.component';
import { ImmobileShowDialogComponent } from './immobile-show-dialog/immobile-show-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  loading: boolean;

  state!: string;
  city!: string;
  district!: string;
  address!: string;

  immobiles!: Immobile[];
  paginate!: Pageable;
  pageEvent!: PageEvent;

  constructor(
    public immobileService: ImmobileService,
    public dialog: MatDialog
  ) { 
    this.loading = true;
  }

  ngOnInit(): void {
    this.getImmobiles(1, 9);
  }

  paginateImmobiles(event: PageEvent) {
    this.getImmobiles(event.pageIndex+1, event.pageSize);
  }

  getImmobiles(page: number, limit: number) {
    this.immobileService.getListImmobiles(page, limit).subscribe(data => {
      this.immobiles = data.data;
      this.paginate = data.meta;
      this.loading = false;
    });
  }

  removeImmobile(id: number) {
    this.immobileService.deleteImmobile(id).subscribe(data => {
      this.getImmobiles(1, 9);
    });
  }

  addImmobile(): void {
    const dialogRef = this.dialog.open(ImmobileFormDialogComponent, {
      minWidth: '100%',
    });
  
    dialogRef.afterClosed().subscribe(data => {
      this.loading = true;
      this.immobileService.getListImmobiles(1, 9).subscribe(data => {
        this.immobiles = data.data;
        this.paginate = data.meta;
        this.loading = false;
      });
    });

  }

  editImmobile(immobile: Immobile): void {

    const dialogRef = this.dialog.open(ImmobileFormDialogComponent, {
      minWidth: '400px',
      data: immobile
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      this.immobileService.getListImmobiles(1, 9).subscribe(data => {
        this.immobiles = data.data;
        this.paginate = data.meta;
        this.loading = false;
      });
    });

  }

  showImmobile(immobile: Immobile): void {
    const dialogRef = this.dialog.open(ImmobileShowDialogComponent, {
      minWidth: '100%',
      data: immobile
    });
  
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  searchShowDialog() {
    const dialogRef = this.dialog.open(ImmobileSearchDialogComponent, {
      minWidth: '100%',
      data: {state: this.state, city: this.city, district: this.district, address: this.address}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.loading = true;
      this.immobileService.postFetchImmobiles(result).subscribe(data => {
        this.immobiles = data.data;
        this.paginate = data.meta;
        this.loading = false;
      });
    });
  }

}
