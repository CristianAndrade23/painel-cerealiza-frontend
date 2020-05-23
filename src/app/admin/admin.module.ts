import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import {MenuModule} from './menu/menu.module';
import {InicialModule} from './inicial/inicial.module';
import {GruposComparacaoModule} from './grupos-comparacao/grupos-comparacao.module';
import {AnaliseLavourasModule} from './analise-lavouras/analise-lavouras.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListaUsuariosModule } from './lista-usuarios/lista-usuarios.module';
import { EmailIndicativoComponent } from './email-indicativo/email-indicativo.component';
import {EmailIndicativoModule} from './email-indicativo/email-indicativo.module';
import { PlanosAVencerComponent } from './planos-a-vencer/planos-a-vencer.component';
import {BsDatepickerModule, PaginationModule, TypeaheadModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {TextMaskModule} from 'angular2-text-mask';

@NgModule({
  declarations: [AdminComponent, PlanosAVencerComponent],
  imports: [
    CommonModule,
    MenuModule,
    InicialModule,
    GruposComparacaoModule,
    AnaliseLavourasModule,
    ListaUsuariosModule,
    TypeaheadModule.forRoot(),
    PaginationModule.forRoot(),
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    BrowserModule,
    FormsModule,
    TextMaskModule,
    ReactiveFormsModule,
    FormsModule,
    EmailIndicativoModule
  ],
  exports: [AdminComponent]
})
export class AdminModule { }
