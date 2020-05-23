import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges,
  TemplateRef, ViewChild
} from '@angular/core';
import {BsModalRef, BsModalService, PageChangedEvent} from 'ngx-bootstrap';
import {ListaGruposService} from './lista-grupos.service';
import {GroupResponse} from '../model/group-response';
import {GroupRequest} from '../model/group-request';
import {FarmingResponse} from '../../analise-lavouras/model/farming-response.model';
import {FarmingDetailResponse} from '../../analise-lavouras/model/farming-detail-response';


@Component({
  selector: 'app-lista-grupos',
  templateUrl: './lista-grupos.component.html',
  styleUrls: ['./lista-grupos.component.css']
})

export class ListaGruposComponent implements OnChanges, OnInit {

  @ViewChild('templateProdutor', {static: false}) templateProdutor: TemplateRef<any>;
  @ViewChild('templateLavoura', {static: false}) templateLavoura: TemplateRef<any>;
  @ViewChild('editar', {static: false}) editar: TemplateRef<any>;
  @ViewChild('atualizado', {static: false}) atualizado: TemplateRef<any>;
  @ViewChild('confirmarExcluirGrupo', {static: false}) confirmarExcluirGrupo: TemplateRef<any>;

  @Input() recebeGruposCriados: GroupResponse[];
  @Input() currentPage: number;
  @Input() recebeNumPagina: number;

  @Output() emiteGruposCriados = new EventEmitter<GroupResponse[]>();
  @Output() emiteNumeroPagina = new EventEmitter<number>();

  atualizarGrupo: GroupRequest = new GroupRequest();

  editarGrupoRef: BsModalRef;
  grupoParaEditarRef: BsModalRef;
  selecionaProdutorRef: BsModalRef;
  confirmarExcluirGrupoRef: BsModalRef;

  gruposCriados: GroupResponse[] = [];
  gruposPesquisados: GroupResponse[] = [];
  gruposPagination: GroupResponse[] = [];

  lavourasEProdutores: FarmingDetailResponse[] = [];
  lavourasDoGrupo: FarmingDetailResponse[] = [];

  lavourasAptasListadas: FarmingResponse[] = [];
  seHouverLavouras: FarmingResponse[] = [];

  grupoAtualizado: GroupResponse;
  editarEsteGrupo: GroupResponse;
  buscaLavourasAptas: GroupResponse;
  grupo: GroupResponse;

  itemsPerPage = 10;
  maxSize = 5;
  idGrupo: number;

  aba = 'home';
  previousText = 'Anterior';
  nextText = 'Próximo';
  filtraGrupo: string;
  selecionaLavoura: string;

  anoColheitaMaiorQueAnoPlantio = false;
  grupoMesmoNome = false;
  grupoSemAnoColheita = false;
  grupoSemNome = false;
  grupoSemCultura = false;
  grupoSemAnoPlantio = false;
  dataInvalida = false;
  grupoNaoPodeEditar = false;
  impossivelExcluirGrupoComlavouras = false;
  lavouraJaNoGrupo = false;

  eventoNumeropagina: PageChangedEvent = {page: 1, itemsPerPage: 10};

  constructor(private listaGruposService: ListaGruposService, private modalService: BsModalService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.listaGruposComparacao();
  }

  ngOnInit() {}

  listaGruposComparacao() {
    this.listaGruposService.getGruposComparacao().subscribe(
      data => {
        this.gruposCriados = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.gruposPagination = this.gruposCriados.slice(0, 10);
        this.emiteGruposCriados.emit(this.gruposCriados);
        if (this.currentPage !== this.eventoNumeropagina.page ||
          this.currentPage === this.eventoNumeropagina.page) {
          this.currentPage = this.eventoNumeropagina.page;
          this.mudarPagina(this.eventoNumeropagina);
        }});
  }

  listaLavourasAptas() {
    this.listaGruposService.listaLavourasAptas(this.buscaLavourasAptas).subscribe(
      data => {
        this.lavourasAptasListadas = data;
        this.lavourasAptasListadas.forEach(p => p.ableFarmings.forEach(f => f.nomeProdutorNomeLavoura = p.producer.name + ' - ' + f.name));
        this.lavourasAptasListadas.forEach(p => p.ableFarmings.forEach(f => this.lavourasEProdutores.push(f)));
        for (let i = 0; i < this.lavourasEProdutores.length; i++) {
          if (this.lavourasDoGrupo.some(l => l.id === this.lavourasEProdutores[i].id)) {
            this.lavourasEProdutores.splice(i, 1);
            this.listarTodasLavourasDoGrupo();
          }}},
      (error) => {
        console.log(error);
      },
      () => {
      });
  }


  listarTodasLavourasDoGrupo() {
    this.listaGruposService.listarTodasLavourasDoGrupo(this.grupo.id).subscribe(
      data => {
        this.lavourasDoGrupo = data;
        for (let i = 0; i < this.lavourasAptasListadas.length; i++) {
          for (let j = 0; j < this.lavourasAptasListadas[i].ableFarmings.length; j++) {
            for (let lav = 0; lav < this.lavourasDoGrupo.length; lav++) {
              if (this.lavourasAptasListadas[i].ableFarmings[j].id === this.lavourasDoGrupo[lav].id) {
                this.lavourasDoGrupo[lav].nomeProdutorNomeLavoura =
                  this.lavourasAptasListadas[i].ableFarmings[j].nomeProdutorNomeLavoura;
              }}}}
        for (let i = 0; i < this.lavourasEProdutores.length; i++) {
          if (this.lavourasDoGrupo.some(l => l.id === this.lavourasEProdutores[i].id)) {
            this.lavourasEProdutores.splice(i, 1);
          }
        }
        },
      error1 => {
        console.log(error1);
      },
      () => {
        this.grupoNaoPodeEditar = false;
        // document.getElementById('focoInput').focus();
      }
      );
  }


  inserirLavourasNoGrupo(evento: FarmingDetailResponse, grupo: GroupResponse) {
    if (this.lavourasDoGrupo.some(lav => lav.id === evento.id)) {
      this.lavouraJaNoGrupo = true;
      return null;
    }
    if (!this.lavourasDoGrupo.some(lav => lav.id === evento.id)) {
      this.lavouraJaNoGrupo = false;
    }
    this.listaGruposService.inserirLavourasAptas(grupo.id, evento.id).subscribe(
        data => {
          console.log(data);
        },
        error1 => {
          console.log(error1);
        },
        () => {
          this.selecionaLavoura = '';
          this.lavourasEProdutores = [];
          this.listaLavourasAptas();
          this.listarTodasLavourasDoGrupo();
        });
  }

  removerLavouraDoGrupo(lavoura, grupo) {
    console.log(lavoura, grupo);
    this.listaGruposService.deletaLavouraDoGrupo(grupo.id, lavoura.id)
      .subscribe(
        data => {
          console.log(data);
        },
        error1 => {
          console.log(error1);
        },
        () => {
          this.listarTodasLavourasDoGrupo();
          this.lavourasEProdutores = [];
          document.getElementById('focoInput').focus();
          this.listaLavourasAptas();
          this.lavouraJaNoGrupo = false;
        });
  }

  editarGrupo(idGrupo: number) {
    if (!this.gruposCriados.some(g => g.name === this.atualizarGrupo.name)) {
      this.grupoMesmoNome = false;
    }
    if (this.atualizarGrupo.plantingYear > this.atualizarGrupo.harvestYear) {
      return this.anoColheitaMaiorQueAnoPlantio = true;
    }
    if (this.atualizarGrupo.plantingYear <= this.atualizarGrupo.harvestYear) {
      this.anoColheitaMaiorQueAnoPlantio = false;
      this.grupoSemAnoColheita = false;
    }
    if (this.atualizarGrupo.name === '' ||
      this.atualizarGrupo.name === ' ' ||
      this.atualizarGrupo.name === '  ' ||
      this.atualizarGrupo.name === '   ' ||
      this.atualizarGrupo.name === '    ' ||
      this.atualizarGrupo.name === '     ' ||
      this.atualizarGrupo.name === '      ' ||
      this.atualizarGrupo.name === '       ' ||
      this.atualizarGrupo.name === '        ' ||
      this.atualizarGrupo.name === '         ' ||
      this.atualizarGrupo.name === '          ' ||
      this.atualizarGrupo.name === '           ' ||
      this.atualizarGrupo.name === '            ' ||
      this.atualizarGrupo.name === '             ' ||
      this.atualizarGrupo.name === '              ' ||
      this.atualizarGrupo.name === '               ' ||
      this.atualizarGrupo.name === '                ' ||
      this.atualizarGrupo.name === '                 ' ||
      this.atualizarGrupo.name === '                  ' ||
      this.atualizarGrupo.name === '                   ' ||
      this.atualizarGrupo.name === '                    ') {
      return  this.grupoSemNome = true;
    }
    if (this.atualizarGrupo.name) {
      this.grupoSemNome = false;
    }
    if (this.atualizarGrupo.plantingYear < 2000) {
      return this.dataInvalida = true;
    }
    if (this.atualizarGrupo.plantingYear >= 2000) {
      this.dataInvalida = false;
    }
    if (!this.atualizarGrupo.plantingYear) {
      return this.grupoSemAnoPlantio = true;
    }
    if (this.atualizarGrupo.plantingYear) {
      this.grupoSemAnoPlantio = false;
    }
    if (!this.atualizarGrupo.harvestYear) {
      this.grupoSemAnoColheita = true;
      return this.anoColheitaMaiorQueAnoPlantio = false;
    }
    if (this.atualizarGrupo.harvestYear) {
      this.grupoSemAnoColheita = false;
    }
    this.listaGruposService.editarGrupo(idGrupo, this.atualizarGrupo).subscribe(
      data => {
        this.grupoAtualizado = data;
      },
      error1 => {
        console.log(error1);
        if (this.gruposCriados.some(g => g.name === this.atualizarGrupo.name)) {
          this.grupoMesmoNome = true;
        }},
      () => {
        this.editarGrupoRef.hide();
        this.modalAvisoDeGrupoAtualizado(this.atualizado);
        this.listaGruposComparacao();
        this.aba = 'home';
        this.gruposPesquisados.splice(0, this.gruposPesquisados.length);
      });
  }


  mostrarGrupo(evento: any) {
    const index = this.gruposCriados.indexOf(evento);
    this.gruposPesquisados.push(evento);
    this.gruposCriados.splice(index, 1);
    this.aba = 'grupoSelecionado';
  }

  resetarBusca(evento: any) {
    if (evento.target.value === '') {
      this.aba = 'home';
      this.gruposPesquisados.splice(0, this.gruposPesquisados.length);
      this.listaGruposComparacao();
    }}

  modalEditar(editar: TemplateRef<any>, grupo: GroupResponse) {
    this.buscaLavourasAptas = grupo;
    this.validaTipoCultura();
    this.editarGrupoRef = this.modalService.show(editar);
    this.editarEsteGrupo = grupo;
    this.atualizarGrupo.name = this.editarEsteGrupo.name;
    this.atualizarGrupo.cultureType = this.editarEsteGrupo.tipoDeCultura;
    this.atualizarGrupo.plantingYear = this.editarEsteGrupo.plantingYear;
    this.atualizarGrupo.harvestYear = this.editarEsteGrupo.harvestYear;

    this.anoColheitaMaiorQueAnoPlantio = false;
    this.grupoMesmoNome = false;
    this.grupoSemAnoColheita = false;
    this.grupoSemNome = false;
    this.grupoSemCultura = false;
    this.grupoSemAnoPlantio = false;
    this.dataInvalida = false;

    this.listaGruposService.listarTodasLavourasDoGrupo(grupo.id)
      .subscribe(
        data => {
          this.seHouverLavouras = data;
        },
        erro => {
          console.log(erro);
        },
        () => {
          this.grupoNaoPodeEditar = this.seHouverLavouras.length !== 0;
        });
  }

  modalAvisoDeGrupoAtualizado(grupoEditado: TemplateRef<any>) {
    this.grupoParaEditarRef = this.modalService.show(grupoEditado);
  }

  modalInserirLavouras(templateProdutor: TemplateRef<any>, grupo: GroupResponse) {
    this.buscaLavourasAptas = grupo;
    this.validaTipoCultura();
    this.selecionaProdutorRef = this.modalService.show(templateProdutor);
    this.selecionaLavoura = '';
    this.grupo = grupo;

    this.lavouraJaNoGrupo = false;
    this.lavourasEProdutores = [];
    this.listarTodasLavourasDoGrupo();
    this.listaLavourasAptas();

    this.grupoNaoPodeEditar = true;
  }

  modalConfirmaExcluirGrupo(template: TemplateRef<any>, grupo: GroupResponse) {
    this.idGrupo = grupo.id;
    this.confirmarExcluirGrupoRef = this.modalService.show(template, {class: 'modal-sm'});
    this.listaGruposService.listarTodasLavourasDoGrupo(grupo.id)
      .subscribe(
        data => {
          this.seHouverLavouras = data;
          if (this.seHouverLavouras.length !== 0) {
            this.impossivelExcluirGrupoComlavouras = true;
          } else if (this.seHouverLavouras.length === 0) {
            this.impossivelExcluirGrupoComlavouras = false;
          }},
        erro => {
          console.log(erro);
        },
        () => {
        });
  }


  confirmarExclusaoDoGrupo() {
    return this.listaGruposService.deletaGrupo(this.idGrupo).subscribe(
      data => {
        console.log(data);
      },
      error1 => {
        console.log(error1);
      },
      () => {
        console.log(this.eventoNumeropagina);
        this.listaGruposComparacao();
        this.aba = 'home';
        this.confirmarExcluirGrupoRef.hide();
      }
    );

  }

  recusarExclusao(): void {
    this.confirmarExcluirGrupoRef.hide();
  }



  mudarPagina(event: PageChangedEvent) {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.gruposPagination = this.gruposCriados.slice(startItem, endItem);
    this.eventoNumeropagina = event;
  }

  validaTipoCultura() {
    if (this.buscaLavourasAptas.cultureType === 'Arroz') {
      this.buscaLavourasAptas.tipoDeCultura = 1;
    } else if (this.buscaLavourasAptas.cultureType === 'Soja') {
      this.buscaLavourasAptas.tipoDeCultura = 2;
    } else if (this.buscaLavourasAptas.cultureType === 'Feijão') {
      this.buscaLavourasAptas.tipoDeCultura = 3;
    } else if ( this.buscaLavourasAptas.cultureType === 'Trigo') {
      this.buscaLavourasAptas.tipoDeCultura = 5;
    } else if (this.buscaLavourasAptas.cultureType === 'Milho') {
      this.buscaLavourasAptas.tipoDeCultura = 6;
    }
  }

}

