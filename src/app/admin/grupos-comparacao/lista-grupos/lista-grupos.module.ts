import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlertModule,
  ButtonsModule,
  ModalModule,
  PaginationModule,
  PopoverModule,
  SortableModule,
  TypeaheadModule
} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListaGruposComponent} from './lista-grupos.component';
import {ListaGruposService} from './lista-grupos.service';
import {ApenasNumerosDirective} from './apenas-numeros.directive';


@NgModule({
  declarations: [
    ListaGruposComponent,
    ApenasNumerosDirective
  ],
  exports: [
    ListaGruposComponent
  ],
  imports: [
    PopoverModule.forRoot(),
    CommonModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    SortableModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot()
  ],
  providers: [ListaGruposService]
})
export class ListaGruposModule { }

