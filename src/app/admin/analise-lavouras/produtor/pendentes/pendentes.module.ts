import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PendentesComponent} from './pendentes.component';

@NgModule({
  declarations: [PendentesComponent],
  imports: [
    CommonModule
  ],
  exports: [PendentesComponent]
})
export class PendentesModule { }
