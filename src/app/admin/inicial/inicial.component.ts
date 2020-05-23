import { Component, OnInit } from '@angular/core';
import * as SecureLS from 'secure-ls';



@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css']
})
export class InicialComponent implements OnInit {

  localStorageCriptografada = new SecureLS();

  constructor() { }

  ngOnInit() {
  }

  getName() {
    return this.localStorageCriptografada.get('name');
  }
}
