import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FarmingDetailResponse} from '../../model/farming-detail-response';
import {CostResponse} from '../../model/cost-response.model';

@Component({
  selector: 'app-pendentes',
  templateUrl: './pendentes.component.html',
  styleUrls: ['./pendentes.component.css']
})
export class PendentesComponent implements OnInit {
  @Input() lavouras: FarmingDetailResponse;
  @Input() custoEfetivo: CostResponse;
  @Input() custoEstimado: CostResponse;
  @Input() desabilitarCheckbox: boolean;

  @Output() lavouraId = new EventEmitter<number>();
  @Output() lavouraNome = new EventEmitter<string>();
  @Output() emiteBloqueioBotao = new EventEmitter();

  aba = 'estimado';
  nomeLavouraApta: string;

  apta = false;
  open = false;

  idLavouraApta: number;



  constructor() { }

  ngOnInit() {}

  mostrarDetalhes() {
    this.open = !this.open;
  }



  check() {
    this.apta = !this.apta;
    if (this.apta === true) {
      this.idLavouraApta = this.lavouras.id;
      this.nomeLavouraApta = this.lavouras.name;
    } else {
      this.idLavouraApta = null;
      this.nomeLavouraApta = null;
    }
    this.lavouraId.emit(this.idLavouraApta);
    this.lavouraNome.emit(this.nomeLavouraApta);
  }

}

