import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogService } from './../../../services/dialog.service';
import { Imovel } from './../../../models/imovel.interface';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ImovelService } from '@app/services/imovel.service';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
    selector: 'app-consulta-imoveis',
    templateUrl: './consulta-imoveis.component.html',
    styleUrls: ['./consulta-imoveis.component.scss']
})
export class ConsultaImoveisComponent implements OnInit {
    public dataSource: MatTableDataSource<Imovel>;
    public displayedColumns: string[];

    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    constructor(private imovel: ImovelService, 
        private confirm: DialogService,
        private toast: MatSnackBar) {
        this.displayedColumns = ['titulo', 'valor', 'localidade', 'bairro', 'action'];
    }

    ngOnInit() {
        this.getAllImoveis();
    }

    public applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getAllImoveis() {
        this.imovel.getAllImoveis()
        .pipe(
            retry(2)
            )
            .subscribe((res: Array<Imovel>) => {
                this.dataSource = new MatTableDataSource(res);
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            });
    }

    edit(id: string) {
        console.log(id)
    }

    delete(imovel: any){
        this.confirm.openConfirmDialog(`Tem certeza que deseja deletar o imóvel ${imovel.titulo}?`)
        .afterClosed().subscribe(res =>{
          if(res){
            this.imovel.deletarImovel(imovel._id)
            .pipe(
                retry(2)
                )
                .subscribe((res: any) => {
                    this.getAllImoveis();
                    this.toast.open('Imóvel deletado com sucesso', '', {
                        duration: 3000,
                        verticalPosition: 'top',
                    })
                }, error => {
                    this.toast.open('Ocorreu um erro ao deletar o imóvel', '', {
                        duration: 3000,
                        verticalPosition: 'top',
                    })
                });
          }
        });
    }

}

