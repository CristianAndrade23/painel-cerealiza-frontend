import {ProducerResponse} from '../../analise-lavouras/model/producer-response.model';

export class FarmingGroupResponse {
  constructor (id?: number,
               name?: string,
               plantingYear?: number,
               harvestYear?: number,
               cultureType?: string,
               producer?: ProducerResponse) { }
}
