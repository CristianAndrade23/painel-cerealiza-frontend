import {NgModule} from '@angular/core';
import {EmailIndicativoComponent} from './email-indicativo.component';
import {CommonModule} from '@angular/common';
import {AlertModule, ButtonsModule, ModalModule, PaginationModule} from 'ngx-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [EmailIndicativoComponent],
  imports: [CommonModule,
            ModalModule.forRoot(),
            ButtonsModule.forRoot(),
            AlertModule.forRoot(),
            FormsModule,
            ReactiveFormsModule,
            PaginationModule.forRoot()],
  exports: [EmailIndicativoComponent],
  providers: []
})
export class EmailIndicativoModule { }
