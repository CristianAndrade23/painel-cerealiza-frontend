export class Plan {
constructor(public id?: number,
            public name?: string) {
}
}

export class ConfigurationPlan {
  constructor(public id?: number,
              public plan?: Plan,
              public minimumHectare?: number,
              public maximumHectare?: number,
              public valuePerHectare?: number) {
    this.plan = new Plan();
  }
}


export class UserPlanObj {
  constructor(public id?: number,
              public startDate?: string,
              public endDate?: string,
              public amount?: number,
              public configurationPlan?: ConfigurationPlan,
) {
    this.configurationPlan = new ConfigurationPlan();
  }
}


