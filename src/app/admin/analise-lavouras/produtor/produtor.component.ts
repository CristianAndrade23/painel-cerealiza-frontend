import {Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {FarmingResponse} from '../model/farming-response.model';
import {ProdutorService} from './produtor.service';
import {ProducerResponse} from '../model/producer-response.model';


@Component({
  selector: 'app-produtor',
  templateUrl: './produtor.component.html',
  styleUrls: ['./produtor.component.css']
})
export class ProdutorComponent implements OnInit {

  @Input() produtor: FarmingResponse;

  @Output() atualizaProdutor = new EventEmitter<ProducerResponse>();

  @ViewChild('template2', {static: false}) template2: TemplateRef<any>;
  @ViewChild('template', {static: false}) template: TemplateRef<any>;

  modalRef: BsModalRef;

  idLavouraRecebido: number[] = [];
  nomeLavouraRecebido: string[] = [];

  disabled = false;

  selecionado: any;

  idRecebidoLavouraApta: number[] = [];
  idRecebidoLavouraPendente: number[] = [];

  desabilitarCheckboxDasAptas = false;
  desabilitarCheckboxDasPendentes = false;

  constructor(private produtorService: ProdutorService, private modalService: BsModalService) {}

  ngOnInit() {}



    recebeLavourasID(idRecebido: number) {
    if (idRecebido !== null) {
      this.idLavouraRecebido.push(idRecebido);
    } else {
      const index = this.idLavouraRecebido.indexOf(idRecebido);
      this.idLavouraRecebido.splice(index);
    }
  }

  recebeLavourasNome(nomeRecebido: string) {
    if (nomeRecebido !== null) {
      this.nomeLavouraRecebido.push(nomeRecebido);
    } else {
      const index = this.nomeLavouraRecebido.indexOf(nomeRecebido);
      this.nomeLavouraRecebido.splice(index);
    }
  }

  recebeBloqueioBotao(evento) {
    if (evento !== null) {
      this.desabilitarCheckboxDasPendentes = true;
      this.idRecebidoLavouraApta.push(evento);
    } else {
      this.desabilitarCheckboxDasPendentes = false;
      const index = this.idRecebidoLavouraApta.indexOf(evento);
      this.idRecebidoLavouraApta.splice(index);
    }
  }

  recebeBloqueioBotaoPendentes(evento) {
   if (evento !== null) {
     this.desabilitarCheckboxDasAptas = true;
     this.idRecebidoLavouraPendente.push(evento);
   } else {
     this.desabilitarCheckboxDasAptas = false;
     const index = this.idRecebidoLavouraPendente.indexOf(evento);
     this.idRecebidoLavouraPendente.splice(index);
   }
  }

  checkDisabledAptas() {
    if (this.idRecebidoLavouraApta.length === 0) {
      return true;
    }
  }

  checkDisabledPendentes() {
    if (this.idRecebidoLavouraPendente.length === 0) {
      return true;
    }
  }

  lavouraApta(): any {
    this.produtorService.lavourasAptas(this.idRecebidoLavouraPendente).subscribe(
      data => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.atualizaProdutor.emit(this.produtor.producer);
        this.openModal(this.template);
      });
  }

  lavouraPendente(): any {
    this.produtorService.mudarParaNaoApta(this.idRecebidoLavouraApta)
      .subscribe(
        data => {
          console.log(data);
        },
        (error) => {
          console.log(error);
        },
        () => {
          this.atualizaProdutor.emit(this.produtor.producer);
          this.openModal2(this.template2);
        });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService
      .show(template, Object.assign({}, {class: 'modalAvisoLavourasAptas'}));
  }

  openModal2(template: TemplateRef<any>) {
    this.modalRef = this.modalService
      .show(template, Object.assign({}, {class: 'modalAvisoLavourasAptas'}));
  }

}
