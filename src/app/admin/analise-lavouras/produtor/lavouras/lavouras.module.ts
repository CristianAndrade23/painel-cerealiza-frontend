import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LavourasComponent} from './lavouras.component';

@NgModule({
  declarations: [LavourasComponent],
  exports: [LavourasComponent],
  imports: [
    CommonModule
  ]
})
export class LavourasModule { }
