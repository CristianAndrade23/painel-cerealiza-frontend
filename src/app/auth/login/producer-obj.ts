export class Phone {
 constructor(public id?: number,
             public ddd?: number,
             public number?: string) {
 }
}

export class Entity {
 constructor(public id?: number,
             public name?: string) {
 }
}

export class AddressResponse {
constructor(public id?: number,
            public country?: string,
            public state?: string,
            public city?: string,
            public district?: string,
            public publicArea?: string,
            public zipCode?: string,
            public publicAreaId?: number,
            public publicAreaType?: string,
            public addressNumber?: number,
            public complement?: string) {
}
}



export class ProducerObj {
  constructor(public id?: number,
              public name?: string,
              public lastName?: string,
              public document?: string,
              public birthday?: string,
              public registerDate?: string,
              public address?: AddressResponse,
              public mobile?: Phone,
              public residential?: Phone,
              public entities?: Entity[]) {
    this.address = new AddressResponse();
    this.mobile = new Phone();
    this.residential = new Phone();
    this.entities = [];
  }
}



