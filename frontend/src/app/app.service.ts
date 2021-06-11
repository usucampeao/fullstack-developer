import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Property, Location } from './app.models';
import { AppSettings } from './app.settings';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import {
  ConfirmDialogComponent,
  ConfirmDialogModel,
} from './shared/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './shared/alert-dialog/alert-dialog.component';
import { TranslateService } from '@ngx-translate/core';

export class Data {
  constructor(
    public properties: Property[],
    public compareList: Property[],
    public favorites: Property[],
    public locations: Location[]
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class AppService {
  public Data = new Data(
    [], // properties
    [], // compareList
    [], // favorites
    [] // locations
  );

  public url = environment.url + '/assets/data/';
  public apiKey = 'AIzaSyA5_n8vURpz4afXX0MILbZ9S2ilhPBs8SM';
  public API = environment.urlAPI;
  photo: File;
  deletedl: [string];

  constructor(
    public http: HttpClient,
    public appSettings: AppSettings,
    public dialog: MatDialog,
    public translateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  public getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.API}/imoveis`);
  }

  public getPropertiesByUser(id): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.API}/imoveis/user/${id}`);
  }

  public getPropertyById(id): Observable<Property> {
    return this.http.get<Property>(`${this.API}/imoveis/${id}`);
  }

  public deleteLocations(idDel): Observable<any> {
    return this.http.delete<any>(`${this.API}/imoveis/${idDel}`);
  }

  public changeProperties(values: any, photo: File, action: string) {
    console.log('valores', values.imovelid, action);
    const formData = new FormData();
    formData.append('descricao', values.descricao);
    formData.append('endereco', values.logradouro);
    formData.append('cidade', values.cidade);
    formData.append('estado', values.estado);
    formData.append('complemento', values.complemento ?? '');
    formData.append('titulo', values.titulo);
    formData.append('ano', values.ano);
    formData.append('valor', values.valor);
    formData.append('cep', values.cep);
    formData.append('numero', values.numero);
    formData.append('bairro', values.bairro);
    formData.append('area', values.area);
    formData.append('quartos', values.quartos);
    formData.append('banheiros', values.banheiros);
    formData.append('garagem', values.garagens);
    formData.append('idstatus', values.idstatus);
    formData.append('status', values.status);
    formData.append('idtipo', values.idtipo);
    formData.append('tipo', values.tipo);
    formData.append('action', action), formData.append('imageFile', photo);
    formData.append('imovelId', values.imovelId);

    if ((action === 'add')) {
      console.log('adiciona');
      return this.http.post(`${this.API}/imoveis/upload`, formData);
    } else {
      console.log('altera');
      return this.http.put(`${this.API}/imoveis/upload`, formData);
    }
  }

  public openConfirmDialog(title: string, message: string) {
    const dialogData = new ConfirmDialogModel(title, message);
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });
    return dialogRef;
  }

  public openAlertDialog(message: string) {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      maxWidth: '400px',
      data: message,
    });
    return dialogRef;
  }

  public getTranslateValue(key: string, param: string = null) {
    let value = null;
    this.translateService
      .get(key, { param: param })
      .subscribe((res: string) => {
        value = res;
      });
    return value;
  }

  public getPropertyTypes() {
    return [
      { id: 2, name: 'Casa' },
      { id: 3, name: 'Apartamento' },
    ];
  }

  public getPropertyStatuses() {
    return [
      { id: 1, name: 'Para Vender' },
      { id: 2, name: 'Para Alugar' },
    ];
  }

  public filterData(data, params: any, sort?, page?, perPage?) {
    // a partir daqui implementamos a seçao de filtros Podemos ter filtros para qualquer um dos campos, deixei apenas doisa para exempliccar
    // fazemos também a ordenaçao
    if (params) {
      // params é um array com os dados que podemos usar como filtro
      if (params.propertyType) {
        //propertyType é uma indicaçao se o tipo do imovel é casa ou apartamento, ou outro que se deseja cadastrar.
        data = data.filter(
          (property) => property.tipo == params.propertyType.name
        );
      }

      if (params.propertyStatus) {
        //propertyType é uma indicaçao se o tipo do imovel é casa ou apartamento, ou outro que se deseja cadastrar.
        data = data.filter(
          (property) => property.status == params.propertyStatus.name
        );
      }
    }

    //console.log(data)

    this.sortData(sort, data);
    return this.paginator(data, page, perPage);
  }

  public sortData(sort, data) {
    if (sort) {
      switch (sort) {
        case 'Newest':
          data = data.sort((a, b) => {
            return <any>new Date(b.published) - <any>new Date(a.published);
          });
          break;
        case 'Oldest':
          data = data.sort((a, b) => {
            return <any>new Date(a.published) - <any>new Date(b.published);
          });
          break;
        case 'Popular':
          data = data.sort((a, b) => {
            if (
              a.ratingsValue / a.ratingsCount <
              b.ratingsValue / b.ratingsCount
            ) {
              return 1;
            }
            if (
              a.ratingsValue / a.ratingsCount >
              b.ratingsValue / b.ratingsCount
            ) {
              return -1;
            }
            return 0;
          });
          break;
        case 'Price (Low to High)':
          if (this.appSettings.settings.currency == 'BRL') {
            data = data.sort((a, b) => {
              if (a.valor > b.valor) {
                return 1;
              }
              if (a.valor < b.valor) {
                return -1;
              }
              return 0;
            });
          }

          break;
        case 'Price (High to Low)':
          if (this.appSettings.settings.currency == 'USD') {
            data = data.sort((a, b) => {
              if (a.valor < b.valor) {
                return 1;
              }
              if (a.valor > b.valor) {
                return -1;
              }
              return 0;
            });
          }
          break;
        default:
          break;
      }
    }
    return data;
  }

  public paginator(items, page?, perPage?) {
    var page = page || 1,
      perPage = perPage || 4,
      offset = (page - 1) * perPage,
      paginatedItems = items.slice(offset).slice(0, perPage),
      totalPages = Math.ceil(items.length / perPage);
    return {
      data: paginatedItems,
      pagination: {
        page: page,
        perPage: perPage,
        prePage: page - 1 ? page - 1 : null,
        nextPage: totalPages > page ? page + 1 : null,
        total: items.length,
        totalPages: totalPages,
      },
    };
  }
}
