import {ProducerResponse} from '../../analise-lavouras/model/producer-response.model';
import {PlanResponse} from './plan-response';

export class ContractedPlanResponse {
  constructor (public id?: number,
               public producer?: ProducerResponse,
               public email?: string,
               public plan?: PlanResponse,
               public startDate?: any,
               public endDate?: any,
               public quantityHectare?: number,
               public amount?: number,
               public isActive?: boolean,
               public tempoExpiracao?: string,
               public planoExpirado?: boolean) {}
}
