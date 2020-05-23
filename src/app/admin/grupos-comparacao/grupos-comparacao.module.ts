import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GruposComparacaoComponent} from './grupos-comparacao.component';
import {ListaGruposModule} from './lista-grupos/lista-grupos.module';
import {AlertModule, ButtonsModule, ModalModule, SortableModule, TypeaheadModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {GruposComparacaoService} from './grupos-comparacao.service';
import {OnlyFournumbersDirective} from './only-fournumbers.directive';

@NgModule({
  declarations: [GruposComparacaoComponent, OnlyFournumbersDirective],
  imports: [
    CommonModule,
    ListaGruposModule,
    TypeaheadModule.forRoot(),
    SortableModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule  ],
  exports: [GruposComparacaoComponent],
  providers: [GruposComparacaoService]
})
export class GruposComparacaoModule { }
