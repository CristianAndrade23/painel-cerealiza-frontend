export class GroupRequest {
  constructor (public id?: number,
               public name?: string,
               public cultureType?: number,
               public plantingYear?: number,
               public harvestYear?: number,
               public tipoCultura?: string) {}
}
