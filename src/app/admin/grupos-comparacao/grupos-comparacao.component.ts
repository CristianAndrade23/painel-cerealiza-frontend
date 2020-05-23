import {Component, DoCheck, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {GruposComparacaoService} from './grupos-comparacao.service';
import {GroupResponse} from './model/group-response';
import {GroupRequest} from './model/group-request';
import {GroupCreated} from './model/group-created';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-grupos-comparacao',
  templateUrl: './grupos-comparacao.component.html',
  styleUrls: ['./grupos-comparacao.component.css']
})

export class GruposComparacaoComponent implements OnInit, DoCheck {

  @ViewChild('templateCriarGrupo', {static: false}) templateCriarGrupo: TemplateRef<any>;
  @ViewChild('aviso', {static: false}) aviso: TemplateRef<any>;

  @Input() abaPainel: number;

  novoGrupo = new GroupRequest();

  criarGrupoRef: BsModalRef;
  avisoGrupoCriadoRef: BsModalRef;

  listaGrupos: GroupResponse[] = [];
  gruposCriados: GroupResponse[] = [];

  grupoCriado: GroupCreated;

  grupoMesmoNome = false;
  grupoSemNome = false;
  grupoSemCultura = false;
  grupoSemAnoColheita = false;
  grupoSemAnoPlantio = false;
  anoColheitaMaiorQueAnoPlantio = false;
  dataInvalida = false;
  campoInvalido = false;

  currentPage: number;

  constructor(private gruposService: GruposComparacaoService,
              private modalService: BsModalService) { }

  ngOnInit() {}

  ngDoCheck() {
    if (!isNullOrUndefined(this.novoGrupo.name)) {
      this.campoInvalido = this.novoGrupo.name.indexOf(' ') >= 0;
    }
    if (this.gruposCriados.some(g => g.name === this.novoGrupo.name)) {
      this.grupoMesmoNome = true;
    }
    if (!this.gruposCriados.some(g => g.name === this.novoGrupo.name)) {
      this.grupoMesmoNome = false;
    }

    if (this.novoGrupo.plantingYear !== undefined) {
      if (this.novoGrupo.plantingYear.toString().length === 4) {
        if (this.novoGrupo.plantingYear < 2000) {
          this.dataInvalida = true;
        }
        if (this.novoGrupo.plantingYear >= 2000) {
          this.dataInvalida = false;
        }
      }
    }

    if (this.novoGrupo.harvestYear !== undefined) {
      if (this.novoGrupo.harvestYear.toString().length === 4) {
        if (this.novoGrupo.plantingYear > this.novoGrupo.harvestYear) {
          this.anoColheitaMaiorQueAnoPlantio = true;
        }
        if (this.novoGrupo.plantingYear <= this.novoGrupo.harvestYear) {
          this.anoColheitaMaiorQueAnoPlantio = false;
          this.grupoSemAnoColheita = false;
        }
      }
    }

  }

  recebeEvento(evento: GroupResponse[]) {
    this.gruposCriados = evento;
  }

  criarGrupos() {
    if (this.novoGrupo.name.indexOf(' ') >= 0) {
      return this.campoInvalido = true;
    }

    if (this.novoGrupo.plantingYear > this.novoGrupo.harvestYear) {
      return this.anoColheitaMaiorQueAnoPlantio = true;
    }
    if (this.novoGrupo.plantingYear <= this.novoGrupo.harvestYear) {
      this.anoColheitaMaiorQueAnoPlantio = false;
      this.grupoSemAnoColheita = false;
    }
    if (!this.novoGrupo.name) {
      return this.grupoSemNome = true;
    }
    if (this.novoGrupo.name) {
      this.grupoSemNome = false;
    }
    if (!this.novoGrupo.cultureType) {
      return this.grupoSemCultura = true;
    }
    if (this.novoGrupo.plantingYear < 2000) {
      return this.dataInvalida = true;
    }
    if (this.novoGrupo.plantingYear >= 2000) {
      this.dataInvalida = false;
    }
    if (this.novoGrupo.cultureType) {
      this.grupoSemCultura = false;
    }
    if (!this.novoGrupo.plantingYear) {
      return this.grupoSemAnoPlantio = true;
    }
    if (this.novoGrupo.plantingYear) {
      this.grupoSemAnoPlantio = false;
    }
    if (!this.novoGrupo.harvestYear) {
      this.grupoSemAnoColheita = true;
      return this.anoColheitaMaiorQueAnoPlantio = false;
    }
    if (this.novoGrupo.harvestYear) {
      this.grupoSemAnoColheita = false;
    }
    this.gruposService.criarGrupos(this.novoGrupo).subscribe(
      data => {
        this.grupoCriado = data;
        // console.log(data);
      },
      (error) => {
        console.log(error);
        if ((this.novoGrupo.name === this.novoGrupo.name) || (this.novoGrupo.name === null)) {
          this.grupoMesmoNome = true;
        }},
      () => {
        this.criarGrupoRef.hide();
        this.modalAvisoGrupoCriado(this.aviso);
        this.listagemDeGrupos();
      });
  }

  listagemDeGrupos() {
    this.gruposService.listarGrupos().subscribe(
      data => {
        this.listaGrupos = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.currentPage = 1;
      });
  }

  modalCriarGrupo(templateCriarGrupo: TemplateRef<any>) {
    this.criarGrupoRef = this.modalService.show(templateCriarGrupo);
    this.novoGrupo = new GroupRequest();
    this.grupoMesmoNome = false;
    this.grupoSemNome = false;
    this.anoColheitaMaiorQueAnoPlantio = false;
    this.grupoSemCultura = false;
    this.grupoSemAnoColheita = false;
    this.grupoSemAnoPlantio = false;
    this.campoInvalido = false;
    this.dataInvalida = false;
  }

  modalAvisoGrupoCriado(modalAvisoGrupoCriadoRef: TemplateRef<any>) {
    this.avisoGrupoCriadoRef = this.modalService.show(modalAvisoGrupoCriadoRef);
  }
}
