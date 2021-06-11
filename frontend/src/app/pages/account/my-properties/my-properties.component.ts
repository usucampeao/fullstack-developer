import { Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Property } from 'src/app/app.models';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserServicesService } from '../../services/userServices.service';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';




@Component({
  selector: 'app-my-properties',
  templateUrl: './my-properties.component.html',
  styleUrls: ['./my-properties.component.scss'],
})
export class MyPropertiesComponent implements OnInit {
  urlOriginal: string;
  userId: string;

  data: any;
  displayedColumns: string[] = ['select','id', 'title', 'published', 'actions'];
  dataSource: MatTableDataSource<Property>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  selection = new SelectionModel<Element>(true, []);


  constructor(
    public appService: AppService,
    public userService: UserServicesService, 
    public router: Router
  ) {}

  ngOnInit() {
     this.propertiesByUser();
  }

  public propertiesByUser(){
    this.userService.returnuser().subscribe((usuario) => {
      this.appService.getPropertiesByUser(usuario.id).subscribe((res) => {
        this.data = res;
        this.initDataSource(this.data);
      });
    });

  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource<Property>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  remove() {
    const idDel = [];
  
    this.selection.selected.forEach(s => 
       idDel.push(s)
      );
    console.log(idDel);
    if (idDel.length > 0 ) {
      const message = this.appService.getTranslateValue('MESSAGE.SURE_DELETE');
      let dialogRef = this.appService.openConfirmDialog(null, message);
      dialogRef.afterClosed().subscribe((dialogResult) => {
        if (dialogResult) {
          this.appService.deleteLocations(idDel).subscribe(() =>{
            
          }
          
          )
        }
      });
    }
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
