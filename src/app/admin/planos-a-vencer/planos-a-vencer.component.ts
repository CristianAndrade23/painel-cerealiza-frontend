import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {PlanosAVencerService} from './planos-a-vencer.service';
import {ContractedPlanResponse} from '../lista-usuarios/model/contracted-plan-response';
import * as moment from 'moment';
import {isNullOrUndefined, isString, log} from 'util';
import {BsDatepickerConfig} from 'ngx-bootstrap/datepicker';
import {UserPlanObj} from './user-plan-obj';

@Component({
  selector: 'app-planos-a-vencer',
  templateUrl: './planos-a-vencer.component.html',
  styleUrls: ['./planos-a-vencer.component.css']
})
export class PlanosAVencerComponent implements OnInit {

  @ViewChild('editar', {static: false}) editar: TemplateRef<any>;
  editarUsuarioRef: BsModalRef;
  carregandoListaGrafico = false;
  listaPlanosAExpirar: ContractedPlanResponse[] = [];
  listaPlanosExpirados: ContractedPlanResponse[] = [];
  listaPlanos: ContractedPlanResponse[] = [];
  usuariosNaoExpiradosPagination: ContractedPlanResponse[] = [];
  usuariosExpiradosPagination: ContractedPlanResponse[] = [];
  usuarioEditarObj: ContractedPlanResponse;
  listaUsuariosExpirados: ContractedPlanResponse[] = [];
  listaUsuariosNaoExpirados: ContractedPlanResponse[] = [];
  mostrarUsuariosNaoExpirados = true;
  mostrarUsuariosExpirados = false;
  mostrarUsuariosPesquisados = false;
  userPlanObj: UserPlanObj = new UserPlanObj();
  planoPesquisado: ContractedPlanResponse[] = [];
  aba = 'home';
  filtraPlano: string;
  dataFinalInvalida = false;
  currentPage = 1;
  maxSize = 5;
  itemsPerPage = 10;
  eventoNumeroPagina: PageChangedEvent = {page: 1, itemsPerPage: 10};
  currentPageExpirados = 1;
  maxSizeExpirados = 5;
  itemsPerPageExpirados = 10;
  eventoNumeroPaginaExpirados: PageChangedEvent = {page: 1, itemsPerPage: 10};
  public maskData = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
  idEditar: number;
  nomeEditar: string
  sobreNomeEditar: string;
  cpfEditar: string;
  emailEditar: string;
  nomePlanoEditar: string;
  startDateEditar: any;
  endDateEditarFormatForRequest: any;
  saveEndDateEditar: any;
  erroMostrarUsuariosExpirados = false;
  erroMostraraUsuariosAexpirar = false;
  erroPutEndDate = false;
  carregandoPut = false;

  constructor(private modalService: BsModalService,
              private planoAVencerService: PlanosAVencerService) { }

  ngOnInit() {
    this.buscaUsuarios();
  }

  buscaUsuarios() {
    this.carregandoListaGrafico = true;
    this.getPlanosAExpirar();
    this.getPlanosExpirados();
  }

  getPlanosAExpirar() {
    this.erroMostraraUsuariosAexpirar = false;
    this.planoAVencerService.getListaPlanosAExpirar().subscribe(
      data => {
        this.listaPlanosAExpirar = data;
        this.listaPlanosAExpirar.forEach(p => p.tempoExpiracao = this.getTempoExpiracaoPlano(p.endDate));
        this.mostraUsuariosNaoExpirados();
        this.ordenaListaUsuariosPorData();
        this.listaPlanosAExpirar.forEach(p => p.producer.fullName = p.producer.name + ' ' + p.producer.lastName);
        this.listaUsuariosNaoExpirados = this.listaPlanosAExpirar;
        // console.log('listaPlanosAExpirar ->', data);
      },
      error => {
        console.log(error);
        this.carregandoListaGrafico = false;
        this.erroMostraraUsuariosAexpirar = true;
      },
      () => {
        this.usuariosNaoExpiradosPagination = this.listaPlanosAExpirar.slice(0, 10);
        if (this.currentPage !== this.eventoNumeroPagina.page ||
          this.currentPage === this.eventoNumeroPagina.page) {
          this.currentPage = this.eventoNumeroPagina.page;
          this.mudarPagina(this.eventoNumeroPagina);
        }
        this.carregandoListaGrafico = false;
        this.filtraPlano = '';
      });
  }

  getPlanosExpirados() {
    this.erroMostrarUsuariosExpirados = false;
    this.planoAVencerService.getListaPlanosExpirados().subscribe(
      data => {
        this.listaPlanosExpirados = data;
        this.listaPlanosExpirados.forEach(p => p.tempoExpiracao = this.getTempoExpiracaoPlano(p.endDate));
        this.listaPlanosExpirados.forEach(p => p.producer.fullName = p.producer.name + ' ' + p.producer.lastName);
        // console.log('listaPlanosExpirados ->', data);
      },
      error => {
        console.log(error);
        this.erroMostrarUsuariosExpirados = true;
      },
      () => {
        this.listaPlanos = this.listaPlanosExpirados.concat(this.listaUsuariosNaoExpirados);
        this.carregandoListaGrafico = false;
        this.usuariosExpiradosPagination = this.listaPlanosExpirados.slice(0, 10);
        if (this.currentPage !== this.eventoNumeroPagina.page ||
          this.currentPage === this.eventoNumeroPagina.page) {
          this.currentPage = this.eventoNumeroPagina.page;
          this.mudarPagina(this.eventoNumeroPagina);
        }
        this.carregandoListaGrafico = false;
        this.filtraPlano = '';
      });
  }

  mudarPagina(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.usuariosNaoExpiradosPagination = this.listaUsuariosNaoExpirados.slice(startItem, endItem);
    this.eventoNumeroPagina = event;
  }

  mudarPaginaExpirados(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.usuariosExpiradosPagination = this.listaUsuariosExpirados.slice(startItem, endItem);
    this.eventoNumeroPaginaExpirados = event;
  }

  putUserPlan() {
    this.carregandoPut = true;
    this.erroPutEndDate = false;
    this.dataFinalInvalida = false;
    this.planoAVencerService.putPlan(this.usuarioEditarObj.id, this.endDateEditarFormatForRequest).subscribe(
      data => {
        console.log(data);
      },
      error => {
        console.log(error);
        this.endDateEditarFormatForRequest = this.saveEndDateEditar;
        this.erroPutEndDate = true;
        this.dataFinalInvalida = true;
        this.carregandoPut = false;
      },
      () => {
        this.carregandoPut = false;
        this.endDateEditarFormatForRequest = this.saveEndDateEditar;
        this.editarUsuarioRef.hide();
        this.buscaUsuarios();
      });
  }

  getObjToEdit() {
    this.zerarValidacaoPut();
    this.saveEndDateEditar = this.endDateEditarFormatForRequest;
    this.endDateEditarFormatForRequest = this.formatDateToPut(this.endDateEditarFormatForRequest);

    if (this.endDateEditarFormatForRequest.indexOf('_') > -1) {
      this.endDateEditarFormatForRequest = this.saveEndDateEditar;
      return this.dataFinalInvalida = true;
    }
    this.putUserPlan();
  }

  formatDateToPut(date: string) {
    console.log('date->', date);
    let dataFormatada: any;
    if (date.length === 8) {
      // dataFormatada = date.toString().substring(0, 2) + date.toString().substring(2, 4) + date.toString().substring(4, 8);
      // dataFormatada = date.toString().substring(0, 2) + ' ' + date.toString().substring(2, 4) + ' ' + date.toString().substring(4, 8);
      dataFormatada = date.toString().substring(4, 8) + '-' + date.toString().substring(2, 4) + '-' + date.toString().substring(0, 2);
      // dataFormatada = date.toString().substring(4, 8) + date.toString().substring(2, 4) + date.toString().substring(0, 2);
      console.log('dataFormatada1->', dataFormatada);
      return dataFormatada;
    }
    if (date.length === 10) {
      // dataFormatada = date.toString().substring(0, 2) + date.toString().substring(3, 5) + date.toString().substring(6, 10);
      // dataFormatada = date.toString().substring(0, 2) + ' ' + date.toString().substring(3, 5) + ' ' + date.toString().substring(6, 10);
      dataFormatada = date.toString().substring(6, 10) + '-' + date.toString().substring(3, 5) + '-' + date.toString().substring(0, 2);
      // dataFormatada = date.toString().substring(6, 10) + date.toString().substring(3, 5) + date.toString().substring(0, 2);
      console.log('dataFormatada2->', dataFormatada);
      return dataFormatada;
    }
  }

  validaSePlanoVenceu(data: string) {
    if (data.toString().substring(11, 12) === 'u') {
      return true;
    } else {
      return false;
    }
  }

  pesquisaPlano(evento: any) {
    const index = this.listaPlanosAExpirar.indexOf(evento);
    this.planoPesquisado.push(evento);
    this.listaPlanosAExpirar.splice(index, 1);
    this.mostrarUsuariosPesquisados = true;
    this.mostrarUsuariosNaoExpirados = false;
    this.mostrarUsuariosExpirados = false;
  }

  resetarBusca(evento?: any) {
    if (evento.target.value === '' || evento === '') {
      this.mostrarUsuariosNaoExpirados = true;
      this.mostrarUsuariosExpirados = false;
      this.mostrarUsuariosPesquisados = false;
      this.planoPesquisado.splice(0, this.planoPesquisado.length);
      this.buscaUsuarios();
    }
  }

  resetarBuscaSpan() {
    this.mostrarUsuariosNaoExpirados = true;
    this.mostrarUsuariosExpirados = false;
    this.mostrarUsuariosPesquisados = false;
    this.planoPesquisado.splice(0, this.planoPesquisado.length);
    this.buscaUsuarios();
  }

  ordenaListaUsuariosPorData() {
    const arrayAnos = []; const arrayMeses = []; const arrayDias = [];
    let diaMesAnoString: string;

    for (let i = 0; i < this.listaUsuariosNaoExpirados.length; i++) {
      if (Number.parseInt(this.listaUsuariosNaoExpirados[i].tempoExpiracao.toString().substring(15, 17), 10) < 10) {
        diaMesAnoString = this.listaUsuariosNaoExpirados[i].tempoExpiracao.toString().substring(17, 18);
      } else {
        diaMesAnoString = this.listaUsuariosNaoExpirados[i].tempoExpiracao.toString().substring(18, 19);
      }

      if (diaMesAnoString === 'a') { arrayAnos.push(this.listaUsuariosNaoExpirados[i]); }
      if (diaMesAnoString === 'm') { arrayMeses.push(this.listaUsuariosNaoExpirados[i]); }
      if (diaMesAnoString === 'd') { arrayDias.push(this.listaUsuariosNaoExpirados[i]); }
    }

    for (let i = 0; i < arrayDias.length; i ++) {
      if (arrayDias[i].tempoExpiracao.toString().substring(15, 17) === 'um') {
        arrayDias[i].tempoExpiracao = arrayDias[i].tempoExpiracao.toString().substring(0, 15) + '1' + arrayDias[i].tempoExpiracao.toString().substring(17, 30);
      }
    }

    this.listaUsuariosNaoExpirados = [];
    arrayDias.forEach(user => this.listaUsuariosNaoExpirados.push(user));
    arrayMeses.forEach(user => this.listaUsuariosNaoExpirados.push(user));
    arrayAnos.forEach(user => this.listaUsuariosNaoExpirados.push(user));
  }

  mostraUsuariosNaoExpirados() {
    this.listaUsuariosNaoExpirados = [];
    this.listaPlanosAExpirar.forEach(user => user.tempoExpiracao.toString().substring(12, 13) === 'e' ? this.listaUsuariosNaoExpirados.push(user) : null);
  }

  getTempoExpiracaoPlano(data) {
    if (data[2] < 10) { data[2] = '0' + data[2].toString(); }
    if (data[1] < 10) { data[1] = '0' + data[1].toString(); }
    const expirationDate = data[2].toString() + data[1].toString() + data[0].toString();
    const expirationTime = moment(expirationDate, 'DDMMYYYY').locale('pt').fromNow();
    if (expirationTime.toString().substring(0, 1) === 'h') { return 'Plano venceu ' + expirationTime; }
    if (expirationTime.toString().substring(0, 1) === 'e') { return 'Plano vence ' + expirationTime; }
    return expirationTime;
  }


  mostrarExpirados() {
    this.carregandoListaGrafico = true;
    this.mostrarUsuariosExpirados = true;
    this.mostrarUsuariosNaoExpirados = false;
    this.getPlanosExpirados();
    this.listaPlanosAExpirar.forEach(user => user.tempoExpiracao.toString().substring(13, 14) === 'h' ? this.listaUsuariosExpirados.push(user) : null);
  }

  mostrarNaoExpirados() {
  this.carregandoListaGrafico = true;
  this.mostrarUsuariosNaoExpirados = true;
  this.mostrarUsuariosExpirados = false;
  this.getPlanosAExpirar();
  this.usuariosExpiradosPagination = this.listaUsuariosExpirados.slice(0, 10);
  if (this.currentPageExpirados !== this.eventoNumeroPaginaExpirados.page ||
    this.currentPageExpirados === this.eventoNumeroPaginaExpirados.page) {
    this.currentPageExpirados = this.eventoNumeroPaginaExpirados.page;
    this.mudarPaginaExpirados(this.eventoNumeroPaginaExpirados);
  }
}

  abrirEditar(usuarioAEditar: ContractedPlanResponse, modalEditar) {
    console.log('usuarioAEditar - ', usuarioAEditar);
    this.zerarValidacaoPut();
    this.getNgModelPutUserObj(usuarioAEditar);
    this.editarUsuarioRef = this.modalService.show(modalEditar);
  }

  getNgModelPutUserObj(usuarioAEditar?: ContractedPlanResponse) {
    this.zerarNgModel();
    this.idEditar = usuarioAEditar.id;
    this.usuarioEditarObj = usuarioAEditar;
    this.nomeEditar = usuarioAEditar.producer.name;
    this.sobreNomeEditar = usuarioAEditar.producer.lastName;
    this.cpfEditar = usuarioAEditar.producer.document;
    this.nomePlanoEditar = usuarioAEditar.plan.name;
    this.startDateEditar = usuarioAEditar.startDate;
    this.endDateEditarFormatForRequest = usuarioAEditar.endDate;
    this.emailEditar = usuarioAEditar.email;

    if (this.startDateEditar[1].toString().substring(0, 1) !== '0') {
      if (Number.parseInt(this.startDateEditar[1], 10) < 10) {
        this.startDateEditar[1] = '0' + this.startDateEditar[1].toString();
      }
    }

    if (this.startDateEditar[2].toString().substring(0, 1) !== '0') {
      if (Number.parseInt(this.startDateEditar[2], 10) < 10) {
        this.startDateEditar[2] = '0' + this.startDateEditar[2].toString();
      }
    }

    if (this.endDateEditarFormatForRequest[1].toString().substring(0, 1) !== '0') {
      if (Number.parseInt(this.endDateEditarFormatForRequest[1], 10) < 10) {
        this.endDateEditarFormatForRequest[1] = '0' + this.endDateEditarFormatForRequest[1].toString();
      }
    }

    if (this.endDateEditarFormatForRequest[2].toString().substring(0, 1) !== '0') {
      if (Number.parseInt(this.endDateEditarFormatForRequest[2], 10) < 10) {
        this.endDateEditarFormatForRequest[2] = '0' + this.endDateEditarFormatForRequest[2].toString();
      }
    }

    this.startDateEditar = this.startDateEditar[2].toString() + this.startDateEditar[1].toString() + this.startDateEditar[0].toString();
    this.endDateEditarFormatForRequest = this.endDateEditarFormatForRequest[2].toString() + this.endDateEditarFormatForRequest[1].toString() + this.endDateEditarFormatForRequest[0].toString();
  }

  zerarNgModel() {
    this.nomeEditar = '';
    this.sobreNomeEditar = '';
    this.cpfEditar = '';
    this.nomePlanoEditar = '';
    this.emailEditar = '';
    this.startDateEditar = [];
    this.startDateEditar[1] = '';
    this.startDateEditar[2] = '';
  }

  zerarValidacaoPut() {
    this.dataFinalInvalida = false;
  }
}
