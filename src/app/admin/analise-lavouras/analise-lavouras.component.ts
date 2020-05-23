import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProducerResponse} from './model/producer-response.model';
import {AnaliseLavourasService} from './analise-lavouras.service';
import {FarmingResponse} from './model/farming-response.model';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-analise-lavouras',
  templateUrl: './analise-lavouras.component.html',
  styleUrls: ['./analise-lavouras.component.css']
})
export class AnaliseLavourasComponent implements OnInit {

  @Input() abaPainel: number;

  @ViewChild('template', {static: false}) template: TemplateRef<any>;

  produtores: ProducerResponse[] = [];
  listaProdutoresSelecionados: ProducerResponse[] = [];

  analisarProdutor: FarmingResponse[] = [];

  modalRef: BsModalRef;

  escolha: string;

  selecionado = false;

  produtorSemLavouras = false;

  constructor(private analiseLavourasService: AnaliseLavourasService) { }

  ngOnInit() {
    this.listaProdutor();
     document.getElementById('pesquisarProd').focus();
  }


  listaProdutor() {
    this.analiseLavourasService.buscaProdutor().subscribe(
      data => {
        this.produtores = data;
        this.produtores.map(p => p.fullName = p.name + ' ' + p.lastName);
      },
      (error) => {
        console.log(error);
      },
      () => {
      });
  }

  produtorSelecionado(produtorEscolhido: ProducerResponse) {
    produtorEscolhido.selecionado = true;
    this.listaProdutoresSelecionados.map
    (prod => prod.id !== produtorEscolhido.id ? prod.selecionado = false : null);
    this.analiseLavourasService.buscaIdLavouras(produtorEscolhido.id).subscribe(
      data => {
        this.analisarProdutor = data;

        if (this.analisarProdutor.length === 0) {
          return this.produtorSemLavouras = true;
        } else {
          return this.produtorSemLavouras = false;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
      });
  }

  pesquisaProdutor(produtor: ProducerResponse) {
    const index = this.produtores.indexOf(produtor);
    this.listaProdutoresSelecionados.push(produtor);
    this.produtores.splice(index, 1);
  }



  removerProdutor(index: number, produtor: ProducerResponse) {
    if (produtor.selecionado === false) {
      this.listaProdutoresSelecionados.splice(index, 1);
    } else if (produtor.selecionado === true) {
      produtor.selecionado = false;
      this.listaProdutoresSelecionados.splice(index, 1);
      this.analisarProdutor.splice(0, 1);
    }
    this.produtores.unshift(produtor);
  }
}
