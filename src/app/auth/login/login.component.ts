import {Component, OnInit, TemplateRef} from '@angular/core';
import {AuthService} from '../auth.service';
import {LoginContract} from './login-contract';
import {Router} from '@angular/router';
import {LoginObj} from './login-obj';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import { RecoverPassService } from './recover-pass.service';
import { RecoverPassObj } from './recover-pass-obj';
import {isNullOrUndefined} from 'util';
import {TokenResponse} from './token-response';
import * as SecureLS from 'secure-ls';
import {ProducerObj} from './producer-obj';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  localStorageCriptografada = new SecureLS();

  emailNaoCadastrado = false;
  erroNoLogin = false;

  loginContract: LoginContract = new LoginContract();
  invalidCredentials = false;
  credentialsRequired = false;
  loginObj: LoginObj = new LoginObj();
  modalMode = false;
  modalRef: BsModalRef;
  loading = false;
  recoverPassObj: RecoverPassObj = new RecoverPassObj();
  passwordSent = false;
  producerObj: ProducerObj = new ProducerObj();
  tokenResponse: TokenResponse = new TokenResponse();
  // modalAvisoEmailRef: BsModalRef;

  constructor(private authService: AuthService, private recoverPassService: RecoverPassService,
              private router: Router, private modalService: BsModalService) {
    this.localStorageCriptografada.set('lang', 'pt');
    this.modalService.onShown.subscribe(() => {this.modalMode = true; });
    this.modalService.onHidden.subscribe(() => {this.modalMode = false; });
  }

  ngOnInit() {
    this.localStorageCriptografada.clear();
    this.localStorageCriptografada.set('ultimaLavouraSelecionada', '0');
  }

  login() {
    // console.log('clicou login');
    this.loading = true;
    // console.log('BEFORE subscribing')
    this.authService.login(this.loginContract)
      .subscribe(
        data => {
          this.tokenResponse = data;
          this.localStorageCriptografada.set('token', this.tokenResponse.token);
          this.saveUserInfoInLocalStorage();
        },
        error => {
          // console.log('error login');
          // console.log(error);
          this.loading = false;
          this.erroNoLogin = true;
          // console.log(error[0]);
          if (error[0].message === '{required.authenticationModel.username}' ||
            error[0].message === '{required.authenticationModel.password}') {
            this.credentialsRequired = true; this.invalidCredentials = false; }
          if (error[0].message === 'invalid credential') {this.credentialsRequired = false; this.invalidCredentials = true; }

        },
        () => {
          this.erroNoLogin = false;
        }
      );
  }

  okEsqueceuSenha() {
    this.modalRef.hide();
    window.location.reload()
  }

  private saveUserInfoInLocalStorage() {
    this.authService.getAuthenticatedUserInformation(this.tokenResponse.token)
      .subscribe(
        data => {
          this.loginObj = data;
          // console.log(data);
          this.localStorageCriptografada.set('al', this.loginObj.accessLevel.toString());
          this.localStorageCriptografada.set('cn', this.loginObj.clientName.toString());
          this.localStorageCriptografada.set('clientId', this.loginObj.clientId.toString());
          this.localStorageCriptografada.set('producerId', this.loginObj.producer.id.toString());
          // localStorage.setItem('selectedProjectIndex', '0');
          this.localStorageCriptografada.set('passwordNeedChange', this.loginObj.changePassword.toString());
          this.localStorageCriptografada.set('userStatus', this.loginObj.isRegisteredUser.toString());
          this.localStorageCriptografada.set('hasActivePlan', this.loginObj.hasActivePlan.toString());
          if (this.loginObj.hasActivePlan === false) {
            return this.router.navigate(['/configuracoes/plano-contratado']);
          } if (this.loginObj.pendingContract === true) {
            return this.router.navigate(['/auth/termos']);
          } if (this.loginObj.changePassword === true) {
            return this.router.navigate(['/auth/change-password']);
          } if (this.loginObj.isRegisteredUser === false) {
            return this.router.navigate(['/configuracoes/dados-cadastro']);
          } else if (this.loginObj.pendingContract === false && this.loginObj.changePassword === false &&
            this.loginObj.isRegisteredUser === true) {
            }
        },
        error => {
          this.loading = false;
          this.authService.logout();
          this.router.navigate(['/auth']);
        }
      );
  }

  resetPass() {
    this.recoverPassService.resetPass(this.recoverPassObj).subscribe(
      () => {},
      (error) => {
        console.log(error);
        this.emailNaoCadastrado = true;
        // this.modalEmailNaoCadastrado(this.emailNaoCadastrado);
      },
      () => {
        this.passwordSent = true;
        this.emailNaoCadastrado = false;
      }
    );
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  // modalEmailNaoCadastrado(template: TemplateRef<any>) {
  //   this.modalAvisoEmailRef = this.modalService.show(template);
  // }
}
