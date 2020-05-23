import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LavourasModule} from './lavouras/lavouras.module';
import {AlertModule, ButtonsModule, ModalModule} from 'ngx-bootstrap';
import {ProdutorComponent} from './produtor.component';
import {ProdutorService} from './produtor.service';
import {PendentesModule} from './pendentes/pendentes.module';

@NgModule({
  declarations: [ProdutorComponent],
  exports: [ProdutorComponent],
  imports: [
    CommonModule,
    LavourasModule,
    PendentesModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  providers: [ProdutorService]
})
export class ProdutorModule { }
