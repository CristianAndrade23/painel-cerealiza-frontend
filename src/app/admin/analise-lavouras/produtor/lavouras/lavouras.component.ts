import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CostResponse} from '../../model/cost-response.model';
import {FarmingDetailResponse} from '../../model/farming-detail-response';

@Component({
  selector: 'app-lavouras',
  templateUrl: './lavouras.component.html',
  styleUrls: ['./lavouras.component.css']
})
export class LavourasComponent implements OnInit {

  @Input() lavouras: FarmingDetailResponse;
  @Input() custoEfetivo: CostResponse;
  @Input() custoEstimado: CostResponse;
  @Input() desabilitarCheckbox: boolean;

  @Output() lavouraId = new EventEmitter<number>();
  @Output() lavouraNome = new EventEmitter<string>();

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
