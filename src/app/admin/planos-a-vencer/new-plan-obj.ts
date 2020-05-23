export class Plan {
constructor(public configurationPlanId?: number,
            public amount?: number) {
}
}


export class NewPlanObj {
  constructor(public plan?: Plan,
              public userId?: number,
              public ip?: string,
) {
    this.plan = new Plan();
  }
}


