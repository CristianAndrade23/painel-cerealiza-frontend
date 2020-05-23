import {CostDetailResponse} from './cost-detail-response.model';

export class CostResponse {
  constructor(
    public directCost?: CostDetailResponse[],
    public indirectCost?: CostDetailResponse[],
    public administrativeCost?: CostDetailResponse[]
  ) {}
}
