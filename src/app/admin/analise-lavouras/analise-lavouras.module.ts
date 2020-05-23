import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AnaliseLavourasComponent} from './analise-lavouras.component';
import {HttpClientModule} from '@angular/common/http';
import {AlertModule, ModalModule, SortableModule, TypeaheadModule} from 'ngx-bootstrap';
import {ProdutorModule} from './produtor/produtor.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AnaliseLavourasService} from './analise-lavouras.service';

@NgModule({
  declarations: [AnaliseLavourasComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    TypeaheadModule.forRoot(),
    SortableModule.forRoot(),
    ProdutorModule,
    AlertModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ],
  exports: [AnaliseLavourasComponent],
  providers: [AnaliseLavourasService]
})
export class AnaliseLavourasModule { }
