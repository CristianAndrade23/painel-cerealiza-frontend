import { Component, OnInit } from '@angular/core';
import {LoginAdminRequest} from './model/login-admin-request';
import {UserResponse} from './model/user-response';
import {LoginAdminService} from './login-admin.service';
import {TokenResponse} from '../token-response';
import {Router} from '@angular/router';
import * as SecureLS from 'secure-ls';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {

  loginRequest: LoginAdminRequest = new LoginAdminRequest();
  userResponse: UserResponse = new UserResponse();
  erroNoLogin = false;
  carregandoLogin = false;
  localStorageCriptografada = new SecureLS();

  constructor(private loginService: LoginAdminService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.carregandoLogin = true;
    console.log('clicou login');
    return this.loginService.signin(this.loginRequest).subscribe(
      data => {
        const token: TokenResponse = new TokenResponse(data.token);
        this.saveUserInformation(token.token);
      },
      (error) => {
        this.carregandoLogin = false;
        console.log('erro login ->', error);
        this.erroNoLogin = true;
      },
      () => {
        this.carregandoLogin = false;
        if (this.erroNoLogin === true){
          this.erroNoLogin = false;
        }
      });
  }

  saveUserInformation(token: string) {
    // console.log('guardando info do usuario');
    return this.loginService.decrypt(token).subscribe(
      data => {
        this.userResponse = data;
        // console.log(this.userResponse);
        this.localStorageCriptografada.set('id', data.clientId.toString());
        this.localStorageCriptografada.set('name', data.clientName);
        this.localStorageCriptografada.set('tk', token);
        this.isTokenValid(token);
      },
      (error) => {
        console.log(error);
      },
      () => {});
  }

  isTokenValid(token: string) {
    // console.log('validando token');
    return this.loginService.validate(token).subscribe(
      data => {
        console.log(data);
      },
      (error) => {
        console.log(error);
      },
      () => {
        return this.router.navigate(['/painel']);
      });
  }

}
