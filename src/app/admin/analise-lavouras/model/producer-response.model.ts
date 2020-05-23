export class ProducerResponse {
  constructor(public id?: number,
              public document?: string,
              public name?: string,
              public lastName?: string,
              public registerDate?: string,
              public birthday?: string,
              public fullName?: string,
              public selecionado?: boolean) {
    this.fullName = this.name + this.lastName;
  }


}
