export class CostDetailResponse {
  constructor(
    public id?: number,
    public costName?: string,
    public typeCostId?: number,
    public valueCost?: number,
    public costPerHectare?: number,
    public costPerBags?: number,
    public observation?: string
  ) {}
}
