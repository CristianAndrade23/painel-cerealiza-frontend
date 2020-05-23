import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ListaUsuariosService} from './lista-usuarios.service';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {ContractedPlanResponse} from './model/contracted-plan-response';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  @ViewChild('ativa', {static: false}) ativa: TemplateRef<any>;
  @ViewChild('desativa', {static: false}) desativa: TemplateRef<any>;

  ativaPlanoRef: BsModalRef;
  desativaPlanoRef: BsModalRef;

  planoDoUsuario: ContractedPlanResponse[] = [];
  planoPagination: ContractedPlanResponse[] = [];
  planoPesquisado: ContractedPlanResponse[] = [];

  aba = 'home';
  filtraPlano: string;
  recebeNomeUsuario: string;

  currentPage = 1;
  maxSize = 5;
  itemsPerPage = 10;
  recebePlanoId: number;

  carregandoLista = false;

  eventoNumeroPagina: PageChangedEvent = {page: 1, itemsPerPage: 10};

  constructor(private listaUsuariosService: ListaUsuariosService, private modalService: BsModalService) { }

  ngOnInit() {
    this.listarPlanos();
  }

  listarPlanos() {
    this.carregandoLista = true;
    this.listaUsuariosService.listaUsuarios().subscribe(
      data => {
        this.planoDoUsuario = data;
        this.planoDoUsuario.
        forEach(p => p.producer.fullName = p.producer.name + ' ' + p.producer.lastName);
        this.planoDoUsuario.reverse();
      },
      error1 => {
        console.log(error1);
      },
      () => {
        console.log('planoPagination', this.planoPagination);
        this.planoPagination = this.planoDoUsuario.slice(0, 10);
        if (this.currentPage !== this.eventoNumeroPagina.page ||
          this.currentPage === this.eventoNumeroPagina.page) {
          this.currentPage = this.eventoNumeroPagina.page;
          this.mudarPagina(this.eventoNumeroPagina);
        }
        this.filtraPlano = '';
        this.carregandoLista = false;
      });
  }

  modalAtivaPlano(ativa: TemplateRef<any>, planoId: number,
                  planoProducerName: string, planoProducerLastname: string) {
    this.ativaPlanoRef = this.modalService.show(ativa);
    this.recebePlanoId = planoId;
    this.recebeNomeUsuario = planoProducerName + ' ' + planoProducerLastname;

    console.log(planoId);
    console.log(this.recebePlanoId);
  }

  ativarPlano(planoId: number): void {
    this.ativaPlanoRef.hide();
    console.log('planoId', planoId);
    this.listaUsuariosService.ativarPlano(planoId).subscribe(
      data => {
        if (this.aba === 'home') {
          this.planoDoUsuario.find(plano => plano.id === planoId).isActive = data;
        } else if (this.aba === 'planoSelecionado') {
          this.planoPesquisado.find(plano => plano.id === planoId).isActive = data;
        }},
      error1 => {
        console.log(error1);
      },
      () => {
        this.aba = 'home';
        this.planoPesquisado.splice(0, this.planoPesquisado.length);
        this.listarPlanos();
        // console.log(this.planoPesquisado);
      });
  }


  modalDesativaPlano(desativa: TemplateRef<any>, planoId: number,
                     planoProducerName: string, planoProducerLastName) {
    this.desativaPlanoRef = this.modalService.show(desativa);
    this.recebePlanoId = planoId;
    this.recebeNomeUsuario = planoProducerName + ' ' + planoProducerLastName;
  }

  desativarPlano(planoId: number): void {
    this.desativaPlanoRef.hide();
    this.listaUsuariosService.desativarPlano(planoId).subscribe(
      data => {
        if (this.aba === 'home') {
          this.planoDoUsuario.find(plano => plano.id === planoId).isActive = data;
        } else if (this.aba === 'planoSelecionado') {
          this.planoPesquisado.find(plano => plano.id === planoId).isActive = data;
        }},
      error1 => {
        console.log(error1);
      },
      () => {
        this.aba = 'home';
        this.planoPesquisado.splice(0, this.planoPesquisado.length);
        this.listarPlanos();
      });
  }

  formatData(data?) {
    if (!isNullOrUndefined(data) && data.length === 3) {
      const year = data[0];
      const month = data[1];
      const day = data[2];
      return `${day}/${month}/${year}`;
    } else {
      const year = data.toString().substring(0, 4);
      const month = data.toString().substring(5, 7);
      const day = data.toString().substring(8, 10);
      return `${day}/${month}/${year}`;
    }
  }

  pesquisaPlano(evento: any) {
    const index = this.planoDoUsuario.indexOf(evento);
    this.planoPesquisado.push(evento);
    this.planoDoUsuario.splice(index, 1);
    this.aba = 'planoSelecionado';
  }

  resetarBusca(evento: any) {
    if (evento.target.value === '') {
      this.aba = 'home';
      this.planoPesquisado.splice(0, this.planoPesquisado.length);
      this.listarPlanos();
    }}

  mudarPagina(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.planoPagination = this.planoDoUsuario.slice(startItem, endItem);
    this.eventoNumeroPagina = event;
  }

}
