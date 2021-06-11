import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Settings, AppSettings } from '../../app.settings';
import { AppService } from '../../app.service';
import { Property, Pagination, Location } from '../../app.models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  watcher: Subscription;
  activeMediaQuery = '';

  public slides = [];
  public properties: Property[];
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public count: number = 8;
  public sort: string;
  public searchFields: any;
  public removedSearchField: string;
  public pagination: Pagination = new Pagination(1, 8, null, 2, 0, 0);
  public message: string;
  public featuredProperties: Property[];
  public locations: Location[];

  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    public appService: AppService,
    public mediaObserver: MediaObserver
  ) {
    this.settings = this.appSettings.settings;

    this.watcher = mediaObserver
      .asObservable()
      .pipe(
        filter((changes: MediaChange[]) => changes.length > 0),
        map((changes: MediaChange[]) => changes[0])
      )
      .subscribe((change: MediaChange) => {
        console.log(change)
        if (change.mqAlias == 'xs') {
          this.viewCol = 100;
        } else if (change.mqAlias == 'sm') {
          this.viewCol = 50;
        } else if (change.mqAlias == 'md') {
          this.viewCol = 33.3;
        } else {
          this.viewCol = 25;
        }
      });
  }

  ngOnInit() {
    this.getProperties();
  }

  ngDoCheck() {
    if (this.settings.loadMore.load) {
      this.settings.loadMore.load = false;
      this.getProperties();
    }
  }

  ngOnDestroy() {
    this.resetLoadMore();
    this.watcher.unsubscribe();
  }



  public getProperties() {
    this.appService.getProperties().subscribe((data) => {
      if (this.properties && this.properties.length > 0) {
        this.settings.loadMore.page++;
        this.pagination.page = this.settings.loadMore.page;
      }

      let result = this.filterData(data);

      if (result.data.length == 0) {
        this.properties.length = 0;
        this.pagination = new Pagination(1, this.count, null, 2, 0, 0);
        this.message = 'Nenhum resultado ';
        return false;
      }

      if (this.properties && this.properties.length > 0) {
        this.properties = this.properties.concat(result.data);
     
      } else {
      
        this.properties = result.data;
        console.log('dados', this.properties)
      }

 

      this.pagination = result.pagination;
      this.message = null;

      if (this.properties.length == this.pagination.total) {
        this.settings.loadMore.complete = true;
        this.settings.loadMore.result = this.properties.length;
      } else {
        this.settings.loadMore.complete = false;
      }
    });
  }

  public resetLoadMore() {
    this.settings.loadMore.complete = false;
    this.settings.loadMore.start = false;
    this.settings.loadMore.page = 1;
    this.pagination = new Pagination(
      1,
      this.count,
      null,
      null,
      this.pagination.total,
      this.pagination.totalPages
    );
  }

  public filterData(data) {
    //passamos o nosso array de imoveis e os parametros de filtro, ordenaçao e paginaçao para o serviço que ira gereciar pagina
    return this.appService.filterData(
      data,
      this.searchFields,
      this.sort,
      this.pagination.page,
      this.pagination.perPage
    );
  }

  public searchClicked() {
    this.properties.length = 0;
    this.getProperties();
  }
  public searchChanged(event) {
    event.valueChanges.subscribe(() => {
      this.resetLoadMore();
      this.searchFields = event.value;
      setTimeout(() => {
        this.removedSearchField = null;
      });
      if (!this.settings.searchOnBtnClick) {
        this.properties.length = 0;
      }
    });
    event.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        if (!this.settings.searchOnBtnClick) {
          this.getProperties();
        }
      });
  }
  public removeSearchField(field) {
    this.message = null;
    this.removedSearchField = field;
  }

  public changeCount(count) {

    this.count = count;
    this.resetLoadMore();
    this.properties.length = 0;
    this.getProperties();
  }
  public changeSorting(sort) {
    this.sort = sort;
    this.resetLoadMore();
    this.properties.length = 0;
    this.getProperties();
  }
  public changeViewType(obj) {
    this.viewType = obj.viewType;
    this.viewCol = obj.viewCol;
  }

 
}
