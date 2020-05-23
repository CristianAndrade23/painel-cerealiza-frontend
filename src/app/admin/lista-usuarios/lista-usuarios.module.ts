import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaUsuariosComponent } from './lista-usuarios.component';
import {ButtonsModule, ModalModule, PaginationModule, TypeaheadModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ListaUsuariosService} from './lista-usuarios.service';

@NgModule({
  declarations: [ListaUsuariosComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    TypeaheadModule.forRoot(),
    ButtonsModule.forRoot()
  ],
  exports: [
    ListaUsuariosComponent
  ],

  providers: [ListaUsuariosService]
})
export class ListaUsuariosModule { }
