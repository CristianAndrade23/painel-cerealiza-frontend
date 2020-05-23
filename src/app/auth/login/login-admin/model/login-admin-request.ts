export class LoginAdminRequest {
  constructor(public username?: string,
              public password?: string,
              public adm?: boolean) {
    this.adm = true;
  }
}
