import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LoginAdminService} from '../../auth/login/login-admin/login-admin.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Input() abaPainel: number;

  @Output() mudarAbaEvent = new EventEmitter<number>();

  desejaSair = false;

  logoPainel = '/assets/img/cerealiza-logo-painel.png';

  constructor(private loginService: LoginAdminService) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
  }

  mudarAba(aba: number) {
    this.mudarAbaEvent.emit(aba);
  }

  logStuff() {
    console.log(this.abaPainel);
  }

  abrirMenu(mostrar) {
    const e = document.getElementById(mostrar);
    if (e.style.display === 'block') {
      e.style.display = 'none';
    } else {
      e.style.display = 'block';
    }
  }
}
