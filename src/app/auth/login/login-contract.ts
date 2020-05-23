export class LoginContract {
  constructor(public username?: string, public password?: string, public adm?: boolean) {
    this.adm = false;
  }

}
