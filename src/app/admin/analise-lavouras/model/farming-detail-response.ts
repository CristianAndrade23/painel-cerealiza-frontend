import {CostResponse} from './cost-response.model';

export class FarmingDetailResponse {
  constructor(public id?: number,
              public name?: string,
              public description?: string,
              public plantedArea?: number,
              public estimatedProductionQuantity?: number,
              public effectiveProductionQuantity?: number,
              public estimatedProductivity?: number,
              public effectiveProductivity?: number,
              public effectiveSalePrice?: number,
              public estimatedSalePrice?: number,
              public plantingYear?: number,
              public harvestYear?: number,
              public ableToCompare?: boolean,
              public cultureType?: string,
              public estimatedCost?: CostResponse[],
              public effectiveCost?: CostResponse[],
              public selecionado?: boolean,
              public producerId?: number,
              public nomeProdutorNomeLavoura?: string
  ) {}
}
