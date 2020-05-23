export class GroupResponse {
  constructor (public id?: number,
               public name?: string,
               public cultureType?: string,
               public plantingYear?: number,
               public  harvestYear?: number,
               public status?: boolean,
               public tipoDeCultura?: number) {
  }
}
