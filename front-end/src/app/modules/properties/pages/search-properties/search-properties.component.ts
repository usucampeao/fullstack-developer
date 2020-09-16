import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/core/services/notification.service';
import { PropertiesService } from 'src/app/core/services/properties.service';
import Property from 'src/app/shared/models/property.model';

@Component({
  selector: 'app-search-properties',
  templateUrl: './search-properties.component.html',
  styleUrls: ['./search-properties.component.sass']
})
export class SearchPropertiesComponent implements OnInit {

  public form: FormGroup;
  public processing: boolean = false;

  public properties: Property[];
  public filteredProperties: Property[];

  constructor(
    private fb: FormBuilder,
    private propertiesService: PropertiesService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.buildForm();
  }

  filterProperties(filter: string){
    if(!this.properties || this.properties.length === 0){
      this.propertiesService.all()
        .subscribe(
          success => this.handleSuccess(success, filter),
          error => this.handleError(error)
        );
    }else{
      this.filteredProperties = this.properties.filter(property => {
        if(property.titulo.toLowerCase().includes(filter.toLowerCase()) ||
          property.descricao.toLowerCase().includes(filter.toLowerCase())){
            return true;
        } else {
          return false;
        }
      });
    }
  }

  submitForm() {
    this.filterProperties(this.form.value.search);
  }

  private handleSuccess(response, filter) {
    this.properties = response;
    this.filterProperties(filter);
  }

  private handleError(response) {
    this.processing = false;
    let msg = response.error.message;
    this.notificationService.notify(`Um erro ocorreu: ${msg}`);
  }

  private buildForm(){
    this.form = this.fb.group({
      search: this.fb.control('', [Validators.required]),
    });
  }
}
