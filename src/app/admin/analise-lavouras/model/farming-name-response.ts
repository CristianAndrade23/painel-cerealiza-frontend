import {ProducerResponse} from './producer-response.model';

export class FarmingNameResponse {
  constructor (public id?: number,
               public name?: string,
               public plantedArea?: number,
               public plantingYear?: number,
               public harvestYear?: number,
               public ableToCompare?: boolean,
               public cultureType?: string,
               public producer?: ProducerResponse) {}
}
