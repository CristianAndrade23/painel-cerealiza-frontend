import { Component, OnInit } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';

@Component({
  selector: 'app-email-indicativo',
  templateUrl: './email-indicativo.component.html',
  styleUrls: ['./email-indicativo.component.css']
})
export class EmailIndicativoComponent implements OnInit {

  modalBuscaLavourasRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit() {
  }

  modalBuscaLavouras(templateBuscarLavouras) {
    this.modalBuscaLavourasRef = this.modalService.show(templateBuscarLavouras);
  }

}
